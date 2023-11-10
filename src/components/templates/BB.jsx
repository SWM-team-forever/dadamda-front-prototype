import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	forwardRef,
	CSSProperties,
} from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";
import {
	closestCenter,
	pointerWithin,
	rectIntersection,
	DndContext,
	DragOverlay,
	getFirstCollision,
	MouseSensor,
	TouchSensor,
	useDroppable,
	useSensors,
	useSensor,
	MeasuringStrategy,
	defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
	SortableContext,
	useSortable,
	arrayMove,
	defaultAnimateLayoutChanges,
	verticalListSortingStrategy,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ScrapCard from "@/components/molcules/Board/ScrapCard.tsx";
import { Box } from "@mui/material";
import { useBoardContentAtom } from "@/hooks/useBoardContentAtom";
import Sticker from "../molcules/Board/Sticker";
import theme from "@/assets/styles/theme";
import { useQuery } from "@tanstack/react-query";
import { useGetBoardContents, useGetOpenBoardContents } from "@/api/board";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import * as Sentry from "@sentry/react";
import { TrashCanIcon } from "../atoms/Icon";
import { useNavigate } from "react-router-dom";

const animateLayoutChanges = (args) =>
	defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export const Action = forwardRef(({ active, cursor, style, ...props }, ref) => {
	return (
		<button
			ref={ref}
			{...props}
			tabIndex={0}
			style={{
				...style,
				cursor,
				backgroundColor: theme.color.Gray_020,
				border: "none",
				borderRadius: "4px",
				padding: "5px",
				boxSizing: "border-box",
				width: "20px",
				height: "20px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		/>
	);
});

export const Handle = forwardRef((props, ref) => {
	return (
		<Action
			ref={ref}
			cursor="grab"
			data-cypress="draggable-handle"
			{...props}
		>
			<svg viewBox="0 0 20 20" fill="#919eab">
				<path
					d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"
					fill="black"
				></path>
			</svg>
		</Action>
	);
});

export function Remove(props) {
	return (
		<Action cursor="pointer" {...props}>
			<svg
				width="6"
				viewBox="0 0 22 22"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M2.99998 -0.000206962C2.7441 -0.000206962 2.48794 0.0972617 2.29294 0.292762L0.292945 2.29276C-0.0980552 2.68376 -0.0980552 3.31682 0.292945 3.70682L7.58591 10.9998L0.292945 18.2928C-0.0980552 18.6838 -0.0980552 19.3168 0.292945 19.7068L2.29294 21.7068C2.68394 22.0978 3.31701 22.0978 3.70701 21.7068L11 14.4139L18.2929 21.7068C18.6829 22.0978 19.317 22.0978 19.707 21.7068L21.707 19.7068C22.098 19.3158 22.098 18.6828 21.707 18.2928L14.414 10.9998L21.707 3.70682C22.098 3.31682 22.098 2.68276 21.707 2.29276L19.707 0.292762C19.316 -0.0982383 18.6829 -0.0982383 18.2929 0.292762L11 7.58573L3.70701 0.292762C3.51151 0.0972617 3.25585 -0.000206962 2.99998 -0.000206962Z" />
			</svg>
		</Action>
	);
}

export const Container = forwardRef(
	(
		{
			children,
			columns = 1,
			handleProps,
			horizontal,
			hover,
			onClick,
			onRemove,
			label,
			placeholder,
			style,
			scrollable,
			shadow,
			unstyled,
			mode,
			...props
		},
		ref
	) => {
		const Component = onClick ? "button" : Box;

		return (
			<Component
				{...props}
				ref={ref}
				style={{
					...style,
					"--columns": columns,
					width: "256px",
					margin: "10px",
				}}
				onClick={onClick}
				tabIndex={onClick ? 0 : undefined}
			>
				{label ? (
					<Box
						sx={{
							display: "flex",
							justifyContent:
								"flex-end",
							width: "100%",
							gap: "5px",
						}}
					>
						{onRemove &&
						!isViewerMode(mode) ? (
							<Remove
								onClick={
									onRemove
								}
							/>
						) : undefined}
						{!isViewerMode(mode) && (
							<Handle
								{...handleProps}
							/>
						)}
					</Box>
				) : null}
				{placeholder ? (
					children
				) : (
					<ul
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "10px",
							padding: "0",
						}}
					>
						{children}
					</ul>
				)}
			</Component>
		);
	}
);

function DroppableContainer({
	children,
	columns = 1,
	disabled,
	id,
	items,
	style,
	...props
}) {
	const {
		active,
		attributes,
		isDragging,
		listeners,
		over,
		setNodeRef,
		transition,
		transform,
	} = useSortable({
		id,
		data: {
			type: "container",
			children: items,
		},
		animateLayoutChanges,
	});
	const isOverContainer = over
		? (id === over.id &&
				active?.data.current?.type !== "container") ||
		  items.includes(over.id)
		: false;

	return (
		<Container
			ref={disabled ? undefined : setNodeRef}
			style={{
				...style,
				transition,
				transform: CSS.Translate.toString(transform),
				opacity: isDragging ? 0.5 : undefined,
			}}
			hover={isOverContainer}
			handleProps={{
				...attributes,
				...listeners,
			}}
			columns={columns}
			{...props}
		>
			{children}
		</Container>
	);
}

const dropAnimation = {
	sideEffects: defaultDropAnimationSideEffects({
		styles: {
			active: {
				opacity: "0.5",
			},
		},
	}),
};

export const Item = React.memo(
	React.forwardRef(
		(
			{
				dragOverlay,
				dragging,
				disabled,
				fadeIn,
				handle,
				handleProps,
				height,
				index,
				listeners,
				onRemove,
				renderItem,
				sorting,
				style,
				transition,
				transform,
				value,
				itemId,
				mode,
				wrapperStyle,
				...props
			},
			ref
		) => {
			useEffect(() => {
				if (!dragOverlay) {
					return;
				}

				document.body.style.cursor = "grabbing";

				return () => {
					document.body.style.cursor = "";
				};
			}, [dragOverlay]);

			return renderItem ? (
				renderItem({
					dragOverlay: Boolean(dragOverlay),
					dragging: Boolean(dragging),
					sorting: Boolean(sorting),
					index,
					fadeIn: Boolean(fadeIn),
					listeners,
					ref,
					style,
					transform,
					transition,
					value,
					itemId,
				})
			) : (
				<Box ref={ref}>
					<div
						style={style}
						data-cypress="draggable-item"
						{...(!handle
							? listeners
							: undefined)}
						{...props}
						tabIndex={
							!handle ? 0 : undefined
						}
					>
						{value.scrapId ? (
							<Box
								onClick={() =>
									!isViewerMode(
										mode
									) &&
									window.open(
										value.pageUrl
									)
								}
							>
								<ScrapCard
									content={
										value
									}
									key={
										value.id
									}
								/>
							</Box>
						) : (
							<Sticker
								content={value}
								key={value.id}
							/>
						)}
					</div>
				</Box>
			);
		}
	)
);

export const TRASH_ID = "void";
const PLACEHOLDER_ID = "placeholder";
const empty = [];

const isViewerMode = (mode) => mode === "view";

export function MultipleContainers({
	adjustScale = false,
	itemCount = 3,
	cancelDrop,
	columns,
	handle = false,
	items: initialItems,
	containerStyle,
	getItemStyles = () => ({}),
	wrapperStyle = () => ({}),
	minimal = false,
	modifiers,
	renderItem,
	strategy = verticalListSortingStrategy,
	trashable = false,
	vertical = false,
	scrollable,
	mode,
}) {
	const {
		boardContent,
		setBoardContent,
		containers,
		setContainers,
		handleAddColumn,
		handleAutoSaveBoard,
		getNextContainerId,
		SAVE_BOARD_INTERVAL,
	} = useBoardContentAtom();
	const { board } = useBoardAtom();
	function initializeBoard(data) {
		if (!data.data.contents) {
			setBoardContent({});
			setContainers([]);
		} else {
			setBoardContent(JSON.parse(data.data.contents));
			setContainers(
				Object.keys(JSON.parse(data.data.contents))
			);
		}
	}

	const boardUUID = board.boardUUID;
	const navigate = useNavigate();
	const getDataMatching = {
		shared: useGetOpenBoardContents,
		mine: useGetBoardContents,
	};

	const isPublicBoard = () => board.type === "trending";

	const useGetData = () => {
		const { data, isLoading } = useQuery(
			["boardContent", boardUUID],
			() => getDataMatching[board.type](boardUUID),
			{
				retry: false,
				onSuccess: (data) => {
					initializeBoard(data);
				},
				onError: (error) => {
					if (error.message === "NF005") {
						useDefaultSnackbar(
							"존재하지 않거나 권한이 없는 보드입니다.",
							"error"
						);
						navigate("/not-found");
					} else {
						useDefaultSnackbar(
							"보드를 불러오는 중 오류가 발생했습니다.",
							"error"
						);
						Sentry.captureException(error);
					}
				},
				useErrorBoundary: true,
				refetchOnWindowFocus: false,
			}
		);

		return isLoading;
	};

	const isLoading = isPublicBoard() ? false : useGetData();
	const removeBoard = () => {
		setBoardContent({});
		setContainers([]);
	};
	useEffect(() => {
		isPublicBoard() &&
			setContainers(
				boardContent ? Object.keys(boardContent) : []
			);

		return () => removeBoard();
	}, [isPublicBoard()]);

	const [activeId, setActiveId] = useState(null);
	const lastOverId = useRef(null);
	const recentlyMovedToNewContainer = useRef(false);
	const isSortingContainer = activeId
		? containers.includes(activeId)
		: false;

	/**
	 * Custom collision detection strategy optimized for multiple containers
	 *
	 * - First, find any droppable containers intersecting with the pointer.
	 * - If there are none, find intersecting containers with the active draggable.
	 * - If there are no intersecting containers, return the last matched intersection
	 *
	 */
	const collisionDetectionStrategy = useCallback(
		(args) => {
			if (activeId && activeId in boardContent) {
				return closestCenter({
					...args,
					droppableContainers:
						args.droppableContainers.filter(
							(container) =>
								container.id in
								boardContent
						),
				});
			}

			// Start by finding any intersecting droppable
			const pointerIntersections = pointerWithin(args);
			const intersections =
				pointerIntersections.length > 0
					? // If there are droppables intersecting with the pointer, return those
					  pointerIntersections
					: rectIntersection(args);
			let overId = getFirstCollision(intersections, "id");

			if (overId != null) {
				if (overId === TRASH_ID) {
					// If the intersecting droppable is the trash, return early
					// Remove this if you're not using trashable functionality in your app
					return intersections;
				}

				if (overId in boardContent) {
					const containerItems =
						boardContent[overId];

					// If a container is matched and it contains items (columns 'A', 'B', 'C')
					if (containerItems.length > 0) {
						// Return the closest droppable within that container
						overId = closestCenter({
							...args,
							droppableContainers:
								args.droppableContainers.filter(
									(
										container
									) =>
										container.id !==
											overId &&
										containerItems.includes(
											container
												.data
												.current
												?.id
										)
								),
						})[0]?.id;
					}
				}

				lastOverId.current = overId;

				return [{ id: overId }];
			}

			// When a draggable item moves to a new container, the layout may shift
			// and the `overId` may become `null`. We manually set the cached `lastOverId`
			// to the id of the draggable item that was moved to the new container, otherwise
			// the previous `overId` will be returned which can cause items to incorrectly shift positions
			if (recentlyMovedToNewContainer.current) {
				lastOverId.current = activeId;
			}

			// If no droppable is matched, return the last match
			return lastOverId.current
				? [{ id: lastOverId.current }]
				: [];
		},
		[activeId, boardContent]
	);
	const [clonedItems, setClonedItems] = useState(null);
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor)
	);
	const findContainer = (id) => {
		if (id in boardContent) {
			return id;
		}

		return Object.keys(boardContent).find((key) => {
			return boardContent[key].includes(id);
		});
	};

	const getIndex = (id) => {
		const container = findContainer(id);

		if (!container) {
			return -1;
		}

		const index = boardContent[container].indexOf(id);

		return index;
	};

	const onDragCancel = () => {
		if (clonedItems) {
			// Reset items to their original state in case items have been
			// Dragged across containers
			// setItems(clonedItems);
			setBoardContent(clonedItems);
		}

		setActiveId(null);
		setClonedItems(null);
	};

	useEffect(() => {
		requestAnimationFrame(() => {
			recentlyMovedToNewContainer.current = false;
		});
	}, [boardContent]);

	useEffect(() => {
		const interval = setInterval(
			() => handleAutoSaveBoard(mode),
			SAVE_BOARD_INTERVAL
		);
		return () => clearInterval(interval);
	}, [handleAutoSaveBoard, mode]);

	if (isLoading) {
		return <div>로딩중</div>;
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={collisionDetectionStrategy}
			measuring={{
				droppable: {
					strategy: MeasuringStrategy.Always,
				},
			}}
			onDragStart={({ active }) => {
				setActiveId(active.id);
				setClonedItems(boardContent);
			}}
			onDragOver={({ active, over }) => {
				const overId = over?.id;

				if (
					overId == null ||
					overId === TRASH_ID ||
					active.id in boardContent
				) {
					return;
				}

				const overContainer = findContainer(overId);
				const activeContainer = findContainer(
					active.id
				);

				if (!overContainer || !activeContainer) {
					return;
				}

				if (activeContainer !== overContainer) {
					setBoardContent((boardContent) => {
						const activeItems =
							boardContent[
								activeContainer
							];
						const overItems =
							boardContent[
								overContainer
							];
						const overIndex =
							overItems.indexOf(
								overId
							);
						const activeIndex =
							activeItems.indexOf(
								active.id
							);

						let newIndex;

						if (overId in boardContent) {
							newIndex =
								overItems.length +
								1;
						} else {
							const isBelowOverItem =
								over &&
								active.rect
									.current
									.translated &&
								active.rect
									.current
									.translated
									.top >
									over
										.rect
										.top +
										over
											.rect
											.height;

							const modifier =
								isBelowOverItem
									? 1
									: 0;

							newIndex =
								overIndex >= 0
									? overIndex +
									  modifier
									: overItems.length +
									  1;
						}

						recentlyMovedToNewContainer.current = true;

						return {
							...boardContent,
							[activeContainer]:
								boardContent[
									activeContainer
								].filter(
									(
										item
									) =>
										item !==
										active.id
								),
							[overContainer]: [
								...boardContent[
									overContainer
								].slice(
									0,
									newIndex
								),
								boardContent[
									activeContainer
								][activeIndex],
								...boardContent[
									overContainer
								].slice(
									newIndex,
									boardContent[
										overContainer
									].length
								),
							],
						};
					});
				}
			}}
			onDragEnd={({ active, over }) => {
				if (active.id in boardContent && over?.id) {
					setContainers((containers) => {
						const activeIndex =
							containers.indexOf(
								active.id
							);
						const overIndex =
							containers.indexOf(
								over.id
							);

						return arrayMove(
							containers,
							activeIndex,
							overIndex
						);
					});
				}

				const activeContainer = findContainer(
					active.id
				);

				if (!activeContainer) {
					setActiveId(null);
					return;
				}

				const overId = over?.id;

				if (overId == null) {
					setActiveId(null);
					return;
				}

				if (overId === TRASH_ID) {
					setBoardContent((items) => ({
						...items,
						[activeContainer]: items[
							activeContainer
						].filter(
							(id) => id !== activeId
						),
					}));
					setActiveId(null);
					return;
				}

				if (overId === PLACEHOLDER_ID) {
					const newContainerId =
						getNextContainerId();

					unstable_batchedUpdates(() => {
						setContainers((containers) => [
							...containers,
							newContainerId,
						]);
						setBoardContent((items) => ({
							...items,
							[activeContainer]:
								items[
									activeContainer
								].filter(
									(id) =>
										id !==
										activeId
								),
							[newContainerId]: [
								active.id,
							],
						}));
						setActiveId(null);
					});
					return;
				}

				const overContainer = findContainer(overId);

				if (overContainer) {
					const activeIndex = boardContent[
						activeContainer
					].indexOf(active.id);
					const overIndex =
						boardContent[
							overContainer
						].indexOf(overId);
					if (activeIndex !== overIndex) {
						setBoardContent((items) => ({
							...items,
							[overContainer]:
								arrayMove(
									items[
										overContainer
									],
									activeIndex,
									overIndex
								),
						}));
					}

					if (activeContainer !== overContainer) {
						const activeItems =
							boardContent[
								activeContainer
							];
						const overItems =
							boardContent[
								overContainer
							];
						let newBoardContent = {};
						for (let item in boardContent) {
							const key = Object.keys(
								boardContent
							).find(
								(key) =>
									boardContent[
										key
									] ===
									boardContent[
										item
									]
							);
							if (key === active.id) {
								newBoardContent =
									{
										...newBoardContent,
										[overId]: overItems,
									};
							} else if (
								key === overId
							) {
								newBoardContent =
									{
										...newBoardContent,
										[active.id]:
											activeItems,
									};
							} else {
								newBoardContent =
									{
										...newBoardContent,
										[key]: boardContent[
											key
										],
									};
							}
						}

						setBoardContent(
							newBoardContent
						);
					}
				}

				setActiveId(null);
			}}
			cancelDrop={cancelDrop}
			onDragCancel={onDragCancel}
			modifiers={modifiers}
		>
			<div
				style={{
					display: "inline-grid",
					boxSizing: "border-box",
					padding: 20,
					gridAutoFlow: vertical
						? "row"
						: "column",
					overflow: "auto",
				}}
			>
				<SortableContext
					items={[...containers, PLACEHOLDER_ID]}
					strategy={
						vertical
							? verticalListSortingStrategy
							: horizontalListSortingStrategy
					}
					disabled={isViewerMode(mode)}
				>
					{containers.map((containerId) => (
						<DroppableContainer
							key={containerId}
							id={containerId}
							label={
								minimal
									? undefined
									: ` `
							}
							columns={columns}
							items={
								boardContent[
									containerId
								]
							}
							scrollable={scrollable}
							style={containerStyle}
							unstyled={minimal}
							onRemove={() => {
								!isViewerMode(
									mode
								) &&
									handleRemove(
										containerId
									);
							}}
							mode={mode}
						>
							<SortableContext
								items={
									boardContent[
										containerId
									]
								}
								strategy={
									strategy
								}
								disabled={isViewerMode(
									mode
								)}
							>
								{boardContent[
									containerId
								].map(
									(
										value,
										index
									) => {
										return (
											<SortableItem
												disabled={
													isSortingContainer
												}
												key={
													value
												}
												id={
													value
												}
												index={
													index
												}
												handle={
													handle
												}
												style={
													getItemStyles
												}
												wrapperStyle={
													wrapperStyle
												}
												renderItem={
													renderItem
												}
												containerId={
													containerId
												}
												getIndex={
													getIndex
												}
											/>
										);
									}
								)}
							</SortableContext>
						</DroppableContainer>
					))}
					{minimal |
					isViewerMode(mode) ? undefined : (
						<DroppableContainer
							id={PLACEHOLDER_ID}
							disabled={
								isSortingContainer
							}
							items={empty}
							onClick={
								handleAddColumn
							}
							placeholder
							style={{
								border: "none",
								height: "fit-content",
								padding: "15px 0",
								borderRadius:
									"8px",
								backgroundColor:
									theme
										.color
										.Gray_020,
								boxShadow: "0px 2px 16px 0px rgba(19, 48, 74, 0.08)",
								cursor: "pointer",
								fontSize: "16px",
								fontWeight: "600",
								lineHeight: "150%",
								color: theme
									.color
									.Gray_080,
							}}
						>
							+ 열 추가하기
						</DroppableContainer>
					)}
				</SortableContext>
			</div>
			{createPortal(
				<DragOverlay
					adjustScale={adjustScale}
					dropAnimation={dropAnimation}
				>
					{activeId
						? containers.includes(activeId)
							? renderContainerDragOverlay(
									activeId
							  )
							: renderSortableItemDragOverlay(
									activeId
							  )
						: null}
				</DragOverlay>,
				document.body
			)}
			{trashable &&
			activeId &&
			!containers.includes(activeId) ? (
				<Trash id={TRASH_ID} />
			) : null}
		</DndContext>
	);

	function renderSortableItemDragOverlay(id) {
		return (
			<Item
				value={id}
				handle={handle}
				style={getItemStyles({
					containerId: findContainer(id),
					overIndex: -1,
					index: getIndex(id),
					value: id,
					isSorting: true,
					isDragging: true,
					isDragOverlay: true,
				})}
				color={getColor(id)}
				wrapperStyle={wrapperStyle({ index: 0 })}
				renderItem={renderItem}
				dragOverlay
			/>
		);
	}

	function renderContainerDragOverlay(containerId) {
		return (
			<Container
				label={` `}
				columns={columns}
				style={{
					height: "100%",
				}}
				shadow
				unstyled={false}
			>
				{boardContent[containerId].map(
					(item, index) => (
						<Item
							key={item.id}
							value={item}
							handle={handle}
							style={getItemStyles({
								containerId,
								overIndex: -1,
								index: getIndex(
									item
								),
								value: item,
								isDragging: false,
								isSorting: false,
								isDragOverlay: false,
							})}
							color={getColor(item)}
							wrapperStyle={wrapperStyle(
								{ index }
							)}
							renderItem={renderItem}
						/>
					)
				)}
			</Container>
		);
	}

	function handleRemove(containerID) {
		setContainers((containers) =>
			containers.filter((id) => id !== containerID)
		);
		setBoardContent((items) => {
			const newItems = { ...items };
			delete newItems[containerID];
			return newItems;
		});
	}
}

function getColor(id) {
	switch (String(id)[0]) {
		case "A":
			return "#7193f1";
		case "B":
			return "#ffda6c";
		case "C":
			return "#00bcd4";
		case "D":
			return "#ef769f";
	}

	return undefined;
}

function Trash({ id, mode }) {
	const { setNodeRef, isOver } = useDroppable({
		id,
	});

	return (
		<Box
			ref={setNodeRef}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "fixed",
				right: {
					xs: "10px",
					sm: "110px",
				},
				top: "60px",
				width: isOver ? "120px" : "60px",
				height: isOver ? "120px" : "60px",
				borderRadius: "50%",
				backgroundColor: isOver
					? theme.color.Blue_080
					: "none",
			}}
		>
			{!isViewerMode(mode) && (
				<TrashCanIcon
					width="30"
					height="30"
					fill={
						isOver
							? "white"
							: theme.color.Gray_060
					}
				/>
			)}
		</Box>
	);
}

function SortableItem({
	disabled,
	id,
	index,
	handle,
	renderItem,
	style,
	containerId,
	getIndex,
	wrapperStyle,
}) {
	const {
		setNodeRef,
		setActivatorNodeRef,
		listeners,
		isDragging,
		isSorting,
		over,
		overIndex,
		transform,
		transition,
	} = useSortable({
		id,
	});
	const mounted = useMountStatus();
	const mountedWhileDragging = isDragging && !mounted;

	return (
		<Item
			ref={disabled ? undefined : setNodeRef}
			value={id}
			dragging={isDragging}
			sorting={isSorting}
			handle={handle}
			handleProps={
				handle
					? { ref: setActivatorNodeRef }
					: undefined
			}
			index={index}
			wrapperStyle={wrapperStyle({ index })}
			style={style({
				index,
				value: id,
				isDragging,
				isSorting,
				overIndex: over ? getIndex(over.id) : overIndex,
				containerId,
			})}
			color={getColor(id)}
			transition={transition}
			transform={transform}
			fadeIn={mountedWhileDragging}
			listeners={listeners}
			renderItem={renderItem}
		/>
	);
}

function useMountStatus() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setIsMounted(true), 500);

		return () => clearTimeout(timeout);
	}, []);

	return isMounted;
}
