import { useState } from "react";
import { Dialog, TextField, Button, Flex, Text } from "@radix-ui/themes";
import { useLists } from "../context/ListsContext";
import type { StartupList } from "../data/mockData";

interface CreateListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (list: StartupList) => void;
  initialStartupId?: number;
}

export default function CreateListDialog({
  open,
  onOpenChange,
  onCreated,
  initialStartupId,
}: CreateListDialogProps) {
  const { createList, addStartupToList } = useLists();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    const newList = createList(name.trim(), description.trim() || undefined);
    if (initialStartupId) {
      addStartupToList(newList.id, initialStartupId);
    }
    onCreated?.(newList);
    setName("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="420px">
        <Dialog.Title>Создать новый список</Dialog.Title>
        <Dialog.Description size="2" color="gray" mb="4">
          Группируйте стартапы по темам для удобной работы.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text size="2" weight="medium" mb="1" as="p">
              Название
            </Text>
            <TextField.Root
              placeholder="Например: HealthTech кандидаты"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
              }}
            />
          </label>

          <label>
            <Text size="2" weight="medium" mb="1" as="p">
              Описание (необязательно)
            </Text>
            <TextField.Root
              placeholder="Краткое описание списка"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Отмена
            </Button>
          </Dialog.Close>
          <Button onClick={handleCreate} disabled={!name.trim()}>
            Создать
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
