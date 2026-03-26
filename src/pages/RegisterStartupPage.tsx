import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
  TextArea,
  Link,
  Separator,
  Badge,
} from "@radix-ui/themes";
import {
  UploadIcon,
  FileTextIcon,
  Cross1Icon,
  Pencil1Icon,
  CheckIcon,
  ExternalLinkIcon,
  ArrowLeftIcon,
} from "@radix-ui/react-icons";
import type { Startup, StartupDetail } from "../data/mockData";
import { useStartups } from "../context/StartupsContext";

type Step =
  | "upload"
  | "processing"
  | "clarify"
  | "finalizing"
  | "preview"
  | "published";

const processingMessages = [
  "Загружаю документ...",
  "Распознаю содержание презентации...",
  "Извлекаю ключевые данные о продукте...",
  "Определяю индустрию и технологии...",
  "Анализирую финансовые показатели...",
  "Ищу информацию о команде...",
  "Нахожу контактные данные...",
  "Определяю юридическую информацию...",
  "Формирую профиль стартапа...",
  "Проверяю корректность данных...",
  "Сверяю с базой существующих стартапов...",
  "Генерирую описание продукта...",
  "Почти готово, финальная сборка...",
];

const finalizingMessages = [
  "Применяю уточнённые данные...",
  "Формирую финальный профиль...",
  "Готово!",
];

const logoColors = [
  "green",
  "blue",
  "red",
  "violet",
  "orange",
  "cyan",
  "indigo",
  "pink",
  "teal",
  "amber",
];

// Simulated AI-extracted data (as if parsed from a PDF)
function generateExtractedStartup(): Omit<Startup, "id"> {
  return {
    name: "NeuroPlan",
    shortDescription:
      "ИИ-платформа для автоматизации городского планирования и анализа транспортных потоков с использованием компьютерного зрения.",
    tags: ["AI/ML", "Computer Vision", "GovTech", "SaaS"],
    logoText: "NP",
    logoColor: logoColors[Math.floor(Math.random() * logoColors.length)],
    status: "В активном поиске инвестиций",
    detail: {
      description:
        "NeuroPlan — ИИ-платформа для автоматизации городского планирования. Система анализирует транспортные потоки, пешеходный трафик и загруженность инфраструктуры с помощью данных с камер наблюдения и IoT-датчиков. На основе анализа формируются рекомендации по оптимизации дорожной сети, размещению объектов инфраструктуры и прогнозированию нагрузки. Платформа позволяет городским администрациям принимать data-driven решения и сокращать время планирования в 5 раз.",
      stage: "",
      industries: "GovTech, Транспорт, Умный город",
      technologies: "AI/ML, Computer Vision, IoT, Big Data, SaaS",
      website: "https://neuroplan.city",
      presentationName: "",
      presentationSize: "",
      registrationCountry: "Россия",
      registrationYear: 2024,
      inn: "7728456123",
      legalEntity:
        'Общество с Ограниченной Ответственностью "НейроПлан Технологии"',
      hqCountry: "Россия",
      hasSales: true,
      revenue: [
        { year: 2024, amount: "4 500 000 RUB" },
        { year: 2025, amount: "18 200 000 RUB" },
      ],
      pilots: [
        {
          company: "Департамент транспорта Москвы",
          description:
            "Пилотный проект по анализу транспортных потоков на 15 перекрёстках. Точность прогнозирования загруженности — 91%.",
        },
      ],
      seekingInvestment: true,
      investmentRound: "",
      investmentAmount: "45 000 000 RUB",
      contactName: "Виктор Городецкий",
      contactEmail: "v.gorodetsky@neuroplan.city",
      contactPhone: "+7 (915) 678-90-12",
    },
  };
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text size="2" style={{ color: "var(--pink-9)" }}>
      {children}
    </Text>
  );
}

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (v: string) => void;
  multiline?: boolean;
  flagged?: boolean;
  onToggleFlag?: () => void;
}

function EditableField({
  label,
  value,
  onSave,
  multiline,
  flagged,
  onToggleFlag,
}: EditableFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleSave = () => {
    onSave(draft);
    setEditing(false);
  };

  return (
    <div
      className={`register-editable-field ${flagged ? "flagged" : ""}`}
    >
      <Flex align="center" justify="between" gap="2">
        <FieldLabel>{label}</FieldLabel>
        <Flex gap="1">
          {onToggleFlag && (
            <button
              className="register-flag-btn"
              onClick={onToggleFlag}
              title={flagged ? "Снять отметку" : "Отметить как неверное"}
            >
              {flagged ? "✓" : "✗"}
            </button>
          )}
          <button
            className="register-edit-btn"
            onClick={() => {
              setDraft(value);
              setEditing(!editing);
            }}
          >
            <Pencil1Icon />
          </button>
        </Flex>
      </Flex>
      {editing ? (
        <Flex direction="column" gap="2" mt="1">
          {multiline ? (
            <TextArea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={4}
            />
          ) : (
            <TextField.Root
              value={draft}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDraft(e.target.value)
              }
            />
          )}
          <Flex gap="2">
            <Button size="1" onClick={handleSave}>
              <CheckIcon /> Сохранить
            </Button>
            <Button
              size="1"
              variant="soft"
              color="gray"
              onClick={() => setEditing(false)}
            >
              Отмена
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Text size="2" as="p" mt="1">
          {value || "—"}
        </Text>
      )}
    </div>
  );
}

export default function RegisterStartupPage() {
  const navigate = useNavigate();
  const { addStartup, startups } = useStartups();
  const [step, setStep] = useState<Step>("upload");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  const [extracted, setExtracted] = useState<Omit<Startup, "id"> | null>(null);
  const [clarifyStage, setClarifyStage] = useState("");
  const [clarifyInvestment, setClarifyInvestment] = useState("");
  const [clarifyQuestion, setClarifyQuestion] = useState(0); // 0 = stage, 1 = investment
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Processing animation
  useEffect(() => {
    if (step === "processing") {
      setMsgIdx(0);
      const messages = processingMessages;
      const interval = setInterval(() => {
        setMsgIdx((prev) => {
          if (prev >= messages.length - 1) return prev;
          return prev + 1;
        });
      }, 1000);

      timerRef.current = setTimeout(() => {
        clearInterval(interval);
        const data = generateExtractedStartup();
        data.detail.presentationName = fileName;
        data.detail.presentationSize = fileSize;
        setExtracted(data);
        setStep("clarify");
      }, 13000);

      return () => {
        clearInterval(interval);
        clearTimeout(timerRef.current);
      };
    }
  }, [step, fileName, fileSize]);

  // Finalizing animation
  useEffect(() => {
    if (step === "finalizing") {
      setMsgIdx(0);
      const interval = setInterval(() => {
        setMsgIdx((prev) => {
          if (prev >= finalizingMessages.length - 1) return prev;
          return prev + 1;
        });
      }, 1200);

      timerRef.current = setTimeout(() => {
        clearInterval(interval);
        if (extracted) {
          const updated = { ...extracted };
          updated.detail = {
            ...updated.detail,
            stage: clarifyStage,
            seekingInvestment: clarifyInvestment === "Да",
          };
          setExtracted(updated);
        }
        setStep("preview");
      }, 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(timerRef.current);
      };
    }
  }, [step, clarifyStage, clarifyInvestment, extracted]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMB} MB`);
    }
  };


  const handlePublish = () => {
    if (!extracted) return;
    const newId = Math.max(...startups.map((s) => s.id), 0) + 1;
    const newStartup: Startup = { ...extracted, id: newId };
    addStartup(newStartup);
    setStep("published");
  };

  const updateField = (path: string, value: string) => {
    if (!extracted) return;
    const updated = { ...extracted };
    if (path.startsWith("detail.")) {
      const key = path.replace("detail.", "") as keyof StartupDetail;
      (updated.detail as Record<string, unknown>)[key] = value;
    } else {
      (updated as Record<string, unknown>)[path] = value;
    }
    setExtracted(updated);
  };

  // Step 1: Upload PDF
  if (step === "upload") {
    return (
      <div className="register-page">
        <button
          className="register-back-btn"
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon /> Назад к стартапам
        </button>

        <div className="register-hero">
          <Heading size="8" weight="bold">
            Регистрация стартапа
          </Heading>
          <Text size="3" color="gray" style={{ maxWidth: 520 }}>
            Загрузите презентацию вашего стартапа в формате PDF. Наш ИИ
            автоматически извлечёт ключевую информацию и заполнит анкету.
          </Text>
        </div>

        <div className="register-upload-zone" onClick={() => fileInputRef.current?.click()}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          {fileName ? (
            <Flex direction="column" align="center" gap="3">
              <Flex
                align="center"
                justify="center"
                style={{
                  width: 64,
                  height: 64,
                  background: "var(--green-3)",
                  borderRadius: "var(--radius-3)",
                }}
              >
                <FileTextIcon width={28} height={28} color="var(--green-11)" />
              </Flex>
              <Text size="3" weight="medium">
                {fileName}
              </Text>
              <Text size="2" color="gray">
                {fileSize}
              </Text>
              <Button
                size="1"
                variant="soft"
                color="gray"
                onClick={(e) => {
                  e.stopPropagation();
                  setFileName("");
                  setFileSize("");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                <Cross1Icon /> Удалить
              </Button>
            </Flex>
          ) : (
            <Flex direction="column" align="center" gap="3">
              <Flex
                align="center"
                justify="center"
                style={{
                  width: 64,
                  height: 64,
                  background: "var(--gray-3)",
                  borderRadius: "var(--radius-3)",
                }}
              >
                <UploadIcon width={28} height={28} />
              </Flex>
              <Text size="3" weight="medium">
                Нажмите, чтобы загрузить PDF
              </Text>
              <Text size="2" color="gray">
                Поддерживаются файлы до 50 MB
              </Text>
            </Flex>
          )}
        </div>

        <Button
          size="3"
          disabled={!fileName}
          style={{
            width: "100%",
            maxWidth: 560,
            margin: "0 auto",
            display: "flex",
            background: fileName ? "var(--gray-12)" : undefined,
            cursor: fileName ? "pointer" : "not-allowed",
          }}
          onClick={() => setStep("processing")}
        >
          Добавить стартап
        </Button>
      </div>
    );
  }

  // Step 2: AI processing
  if (step === "processing") {
    const messages = processingMessages;
    return (
      <div className="register-page">
        <div className="scouting-loading">
          <div className="scouting-loader">
            <div className="scouting-loader-ring" />
          </div>
          <div className="scouting-loading-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`scouting-loading-msg ${
                  i === msgIdx
                    ? "active"
                    : i < msgIdx
                      ? "done"
                      : ""
                }`}
              >
                {i < msgIdx ? "✓" : i === msgIdx ? "●" : "○"} {msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Clarification questions — quiz style
  if (step === "clarify") {
    const stageOptions = [
      { value: "Pre-seed", label: "Pre-seed", desc: "Идея или ранний прототип, валидация гипотез" },
      { value: "Seed", label: "Seed", desc: "Есть MVP, первые пользователи или пилоты" },
      { value: "Late Seed", label: "Late Seed", desc: "Подтверждённый спрос, начало монетизации" },
      { value: "Round A", label: "Round A", desc: "Работающая бизнес-модель, масштабирование" },
      { value: "Round B", label: "Round B", desc: "Активный рост, расширение рынков" },
      { value: "Round C", label: "Round C", desc: "Зрелый бизнес, подготовка к IPO или M&A" },
    ];

    const investOptions = [
      { value: "Да", label: "Да, привлекаю", desc: "Сейчас в активном поиске инвестиций" },
      { value: "Нет", label: "Нет, не привлекаю", desc: "На данный момент инвестиции не требуются" },
    ];

    const handleStageSelect = (value: string) => {
      setClarifyStage(value);
      setTimeout(() => setClarifyQuestion(1), 350);
    };

    const handleInvestSelect = (value: string) => {
      setClarifyInvestment(value);
      setTimeout(() => setStep("finalizing"), 350);
    };

    return (
      <div className="register-page">
        {/* Progress indicator */}
        <div className="quiz-progress">
          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: clarifyQuestion === 0 ? "50%" : "100%" }}
            />
          </div>
          <Text size="1" color="gray">
            Вопрос {clarifyQuestion + 1} из 2
          </Text>
        </div>

        <div className="quiz-container" key={clarifyQuestion}>
          <div className="quiz-question">
            <Heading size="5" weight="bold">
              {clarifyQuestion === 0
                ? "На какой стадии развития ваш стартап?"
                : "Привлекаете ли вы сейчас инвестиции?"}
            </Heading>
            <Text size="2" color="gray" mt="1">
              {clarifyQuestion === 0
                ? "Мы не смогли точно определить стадию из презентации"
                : "Мы не нашли эту информацию в презентации"}
            </Text>
          </div>

          <div className="quiz-options">
            {(clarifyQuestion === 0 ? stageOptions : investOptions).map(
              (opt) => {
                const isSelected =
                  clarifyQuestion === 0
                    ? clarifyStage === opt.value
                    : clarifyInvestment === opt.value;
                return (
                  <button
                    key={opt.value}
                    className={`quiz-option ${isSelected ? "selected" : ""}`}
                    onClick={() =>
                      clarifyQuestion === 0
                        ? handleStageSelect(opt.value)
                        : handleInvestSelect(opt.value)
                    }
                  >
                    <div className="quiz-option-radio">
                      {isSelected && <div className="quiz-option-radio-dot" />}
                    </div>
                    <div className="quiz-option-text">
                      <Text size="3" weight="medium">
                        {opt.label}
                      </Text>
                      <Text size="2" color="gray">
                        {opt.desc}
                      </Text>
                    </div>
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Finalizing
  if (step === "finalizing") {
    const messages = finalizingMessages;
    return (
      <div className="register-page">
        <div className="scouting-loading">
          <div className="scouting-loader">
            <div className="scouting-loader-ring" />
          </div>
          <div className="scouting-loading-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`scouting-loading-msg ${
                  i === msgIdx
                    ? "active"
                    : i < msgIdx
                      ? "done"
                      : ""
                }`}
              >
                {i < msgIdx ? "✓" : i === msgIdx ? "●" : "○"} {msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 6: Published — sent for moderation
  if (step === "published") {
    return (
      <div className="register-page">
        <div className="register-hero">
          <div className="register-success-icon">✓</div>
          <Heading size="7" weight="bold">
            Анкета отправлена на проверку
          </Heading>
          <Text size="3" color="gray" style={{ maxWidth: 520 }}>
            {extracted?.name} успешно зарегистрирован. Модератор проверит данные
            — обычно это занимает до 24 часов.
          </Text>
        </div>

        <div className="register-moderation-steps">
          <div className="register-mod-step active">
            <div className="register-mod-step-icon done">✓</div>
            <div className="register-mod-step-text">
              <Text size="2" weight="medium">Анкета заполнена</Text>
              <Text size="1" color="gray">Данные стартапа сохранены</Text>
            </div>
          </div>
          <div className="register-mod-step-line" />
          <div className="register-mod-step active">
            <div className="register-mod-step-icon pending">●</div>
            <div className="register-mod-step-text">
              <Text size="2" weight="medium">Проверка модератором</Text>
              <Text size="1" color="gray">Модератор верифицирует информацию о стартапе</Text>
            </div>
          </div>
          <div className="register-mod-step-line" />
          <div className="register-mod-step">
            <div className="register-mod-step-icon future">○</div>
            <div className="register-mod-step-text">
              <Text size="2" weight="medium">Карточка опубликована</Text>
              <Text size="1" color="gray">Стартап станет виден инвесторам и корпорациям</Text>
            </div>
          </div>
        </div>

        <Card style={{ maxWidth: 520, margin: "0 auto", width: "100%", background: "var(--green-2)", border: "1px solid var(--green-5)" }}>
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium" style={{ color: "var(--green-11)" }}>
              Что доступно уже сейчас
            </Text>
            <Text size="2" color="gray">
              Пока модератор проверяет анкету, вы можете просматривать каталог
              инвесторов и пилотные программы корпораций. После верификации вы
              сможете откликаться на пилоты и создавать раунды для привлечения
              инвестиций.
            </Text>
          </Flex>
        </Card>

        <Flex justify="center">
          <Button
            size="3"
            style={{ background: "var(--gray-12)", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Перейти к платформе
          </Button>
        </Flex>
      </div>
    );
  }

  // Step 5: Preview with editable fields
  if (!extracted) return null;
  const d = extracted.detail;

  return (
    <div className="register-preview-page">
      <div className="register-preview-scroll">
        <button
          className="register-back-btn"
          onClick={() => setStep("clarify")}
        >
          <ArrowLeftIcon /> Назад к уточнениям
        </button>

        <Flex direction="column" gap="1" mb="4" mt="2">
          <Heading size="6" weight="bold">
            Превью карточки стартапа
          </Heading>
          <Text size="2" color="gray">
            Проверьте данные, отредактируйте при необходимости и опубликуйте.
            Нажмите <Pencil1Icon style={{ display: "inline", verticalAlign: "middle" }} /> для
            редактирования поля.
          </Text>
        </Flex>

        {/* Header — same as StartupDetail */}
        <Flex align="center" gap="4" mb="5" mt="3">
          <div
            className="startup-logo"
            style={{
              color: `var(--${extracted.logoColor}-11)`,
              background: `var(--${extracted.logoColor}-3)`,
              borderColor: `var(--${extracted.logoColor}-5)`,
              width: 56,
              height: 56,
              fontSize: 18,
            }}
          >
            {extracted.logoText}
          </div>
          <Flex direction="column" gap="1">
            <EditableField
              label="Название"
              value={extracted.name}
              onSave={(v) => updateField("name", v)}
            />
            <Flex align="center" gap="2">
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#21a038",
                  display: "inline-block",
                }}
              />
              <Text size="2" color="gray">
                {extracted.status}
              </Text>
            </Flex>
            <Flex gap="2" mt="1" wrap="wrap">
              {extracted.tags.map((tag) => (
                <Badge key={tag} variant="soft" color="gray" radius="full" size="2">
                  {tag}
                </Badge>
              ))}
            </Flex>
          </Flex>
        </Flex>

        {/* Продукт */}
        <div className="register-section">
          <Heading size="4" mb="4">
            Продукт
          </Heading>
          <Flex direction="column" gap="3">
            <EditableField
              label="Описание"
              value={d.description}
              onSave={(v) => updateField("detail.description", v)}
              multiline
            />
            <Flex gap="8" wrap="wrap">
              <EditableField
                label="Стадия развития"
                value={d.stage}
                onSave={(v) => updateField("detail.stage", v)}
              />
              <EditableField
                label="Индустрии"
                value={d.industries}
                onSave={(v) => updateField("detail.industries", v)}
              />
            </Flex>
            <EditableField
              label="Технологии"
              value={d.technologies}
              onSave={(v) => updateField("detail.technologies", v)}
            />
            <EditableField
              label="Сайт"
              value={d.website}
              onSave={(v) => updateField("detail.website", v)}
            />
            {d.presentationName && (
              <>
                <Separator size="4" />
                <div>
                  <FieldLabel>Презентация</FieldLabel>
                  <Flex align="center" gap="3" mt="2">
                    <Flex
                      align="center"
                      justify="center"
                      style={{
                        width: 40,
                        height: 40,
                        background: "var(--gray-3)",
                        borderRadius: "var(--radius-2)",
                      }}
                    >
                      <FileTextIcon width={20} height={20} />
                    </Flex>
                    <Flex direction="column">
                      <Text size="2">{d.presentationName}</Text>
                      <Text size="1" color="gray">
                        {d.presentationSize}
                      </Text>
                    </Flex>
                  </Flex>
                </div>
              </>
            )}
          </Flex>
        </div>

        {/* Компания */}
        <div className="register-section">
          <Heading size="4" mb="4">
            Компания
          </Heading>
          <Flex direction="column" gap="3">
            <Flex gap="8" wrap="wrap">
              <div style={{ minWidth: 200 }}>
                <EditableField
                  label="Страна регистрации юридического лица или ИП"
                  value={d.registrationCountry}
                  onSave={(v) => updateField("detail.registrationCountry", v)}
                />
              </div>
              <EditableField
                label="Год регистрации"
                value={String(d.registrationYear)}
                onSave={(v) => updateField("detail.registrationYear", v)}
              />
            </Flex>
            <Flex gap="8" wrap="wrap">
              <div style={{ minWidth: 200 }}>
                <EditableField
                  label="ИНН"
                  value={d.inn}
                  onSave={(v) => updateField("detail.inn", v)}
                />
              </div>
              <EditableField
                label="Юридическое лицо или ИП"
                value={d.legalEntity}
                onSave={(v) => updateField("detail.legalEntity", v)}
              />
            </Flex>
            <EditableField
              label="Где фактически базируется штаб квартира"
              value={d.hqCountry}
              onSave={(v) => updateField("detail.hqCountry", v)}
            />
            <div>
              <FieldLabel>Есть продажи</FieldLabel>
              <Text size="2" as="p" mt="1">
                {d.hasSales ? "Да" : "Нет"}
              </Text>
            </div>
          </Flex>
        </div>

        {/* Выручка */}
        <div className="register-section">
          <Heading size="4" mb="4">
            Выручка
          </Heading>
          {d.revenue.length > 0 ? (
            <table className="register-table">
              <thead>
                <tr>
                  <th><Text size="2" style={{ color: "var(--pink-9)" }}>Год</Text></th>
                  <th><Text size="2" style={{ color: "var(--pink-9)" }}>Сумма</Text></th>
                </tr>
              </thead>
              <tbody>
                {d.revenue.map((r) => (
                  <tr key={r.year}>
                    <td><Text size="2">{r.year}</Text></td>
                    <td><Text size="2">{r.amount}</Text></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Text size="2" color="gray">Данные о выручке отсутствуют</Text>
          )}
        </div>

        {/* Успешные пилоты */}
        <div className="register-section">
          <Heading size="4" mb="4">
            Успешные пилоты
          </Heading>
          {d.pilots.length > 0 ? (
            <Flex direction="column" gap="3">
              {d.pilots.map((pilot, i) => (
                <div key={i} className="register-pilot-card">
                  <Text size="2" weight="bold" as="p">
                    {pilot.company}
                  </Text>
                  <Text size="2" color="gray" as="p" mt="1">
                    {pilot.description}
                  </Text>
                </div>
              ))}
            </Flex>
          ) : (
            <Text size="2" color="gray">У стартапа нет пилотов</Text>
          )}
        </div>

        {/* Инвестиции */}
        <div className="register-section">
          <Heading size="4" mb="4">
            Инвестиции
          </Heading>
          <Flex direction="column" gap="3">
            <div>
              <FieldLabel>Привлекаете инвестиции</FieldLabel>
              <Text size="2" as="p" mt="1">
                {d.seekingInvestment ? "Да" : "Нет"}
              </Text>
            </div>
            {d.seekingInvestment && (
              <>
                <EditableField
                  label="Раунд"
                  value={d.investmentRound}
                  onSave={(v) => updateField("detail.investmentRound", v)}
                />
                <EditableField
                  label="Запрашиваемая сумма"
                  value={d.investmentAmount}
                  onSave={(v) => updateField("detail.investmentAmount", v)}
                />
              </>
            )}
          </Flex>
        </div>

        {/* Контактная информация */}
        <div className="register-section">
          <Heading size="4" mb="4">
            Контактная информация
          </Heading>
          <Flex direction="column" gap="3">
            <EditableField
              label="Имя и фамилия контактного лица"
              value={d.contactName}
              onSave={(v) => updateField("detail.contactName", v)}
            />
            <EditableField
              label="Email контактного лица"
              value={d.contactEmail}
              onSave={(v) => updateField("detail.contactEmail", v)}
            />
            <EditableField
              label="Телефон контактного лица"
              value={d.contactPhone}
              onSave={(v) => updateField("detail.contactPhone", v)}
            />
          </Flex>
        </div>

        {/* Publish button */}
        <Button
          size="3"
          style={{
            width: "100%",
            background: "#21a038",
            cursor: "pointer",
            marginTop: 16,
            marginBottom: 32,
          }}
          onClick={handlePublish}
        >
          Опубликовать стартап
        </Button>
      </div>
    </div>
  );
}
