import { useState } from "react";
import { Popover, IconButton, Text, Flex, Separator } from "@radix-ui/themes";
import {
  BookmarkIcon,
  BookmarkFilledIcon,
  PlusIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { useLists } from "../context/ListsContext";
import CreateListDialog from "./CreateListDialog";

interface AddToListPopoverProps {
  startupId: number;
  size?: "1" | "2";
}

export default function AddToListPopover({
  startupId,
  size = "1",
}: AddToListPopoverProps) {
  const { lists, addStartupToList, removeStartupFromList, getListsForStartup } =
    useLists();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const inLists = getListsForStartup(startupId);
  const isInAnyList = inLists.length > 0;

  const handleToggle = (listId: string, isIn: boolean) => {
    if (isIn) {
      removeStartupFromList(listId, startupId);
    } else {
      addStartupToList(listId, startupId);
    }
  };

  const handleCreateClick = () => {
    setPopoverOpen(false);
    setDialogOpen(true);
  };

  return (
    <>
      <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Popover.Trigger>
          <IconButton
            variant="ghost"
            size={size}
            color={isInAnyList ? "indigo" : "gray"}
            className="add-to-list-trigger"
            onClick={(e) => e.stopPropagation()}
            title="Добавить в список"
          >
            {isInAnyList ? (
              <BookmarkFilledIcon />
            ) : (
              <BookmarkIcon />
            )}
          </IconButton>
        </Popover.Trigger>

        <Popover.Content
          side="bottom"
          align="end"
          className="add-to-list-content"
          style={{ width: 240 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Text size="2" weight="medium" mb="2" as="p">
            Добавить в список
          </Text>

          <div className="add-to-list-items">
            {lists.map((list) => {
              const isIn = list.startupIds.includes(startupId);
              return (
                <button
                  key={list.id}
                  className={`add-to-list-item ${isIn ? "checked" : ""}`}
                  onClick={() => handleToggle(list.id, isIn)}
                >
                  <span className="add-to-list-item-name">{list.name}</span>
                  {isIn && (
                    <CheckIcon className="add-to-list-check" />
                  )}
                </button>
              );
            })}

            {lists.length === 0 && (
              <Text size="1" color="gray" as="p" style={{ padding: "8px 0" }}>
                Нет списков
              </Text>
            )}
          </div>

          <Separator size="4" my="2" />

          <button className="add-to-list-create" onClick={handleCreateClick}>
            <PlusIcon /> Создать список
          </button>
        </Popover.Content>
      </Popover.Root>

      <CreateListDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialStartupId={startupId}
      />
    </>
  );
}
