import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Separator,
  Table,
  Text,
} from "@radix-ui/themes";
import {
  Cross1Icon,
  FileTextIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import type { Startup } from "../data/mockData";
import AddToListPopover from "../components/AddToListPopover";

const sections = [
  { id: "product", label: "Продукт" },
  { id: "company", label: "Компания" },
  { id: "revenue", label: "Выручка" },
  { id: "pilots", label: "Успешные пилоты" },
  { id: "investments", label: "Инвестиции" },
  { id: "contacts", label: "Контактная информация" },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text size="2" style={{ color: "var(--pink-9)" }}>
      {children}
    </Text>
  );
}

function FieldValue({ children }: { children: React.ReactNode }) {
  return (
    <Text size="2" as="p" mt="1">
      {children}
    </Text>
  );
}

interface StartupDetailProps {
  startup: Startup;
  onClose: () => void;
}

export default function StartupDetail({ startup, onClose }: StartupDetailProps) {
  const [activeSection, setActiveSection] = useState("product");

  // Scroll to top when switching startups
  useEffect(() => {
    document.querySelector(".detail-panel")?.scrollTo(0, 0);
    setActiveSection("product");
  }, [startup.id]);

  // Scroll spy for section navigation
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(".detail-panel");
      if (!container) return;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section.id);
          }
        }
      }
    };

    const container = document.querySelector(".detail-panel");
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  const d = startup.detail;

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="detail-layout">
      <div className="detail-main">
        {/* Close button + Add to list */}
        <Flex align="center" justify="between">
          <button className="detail-close-btn" onClick={onClose}>
            <Cross1Icon /> Закрыть
          </button>
          <AddToListPopover startupId={startup.id} size="2" />
        </Flex>

        {/* Header */}
        <Flex align="center" gap="4" mb="5" mt="3">
          <div
            className="startup-logo"
            style={{
              color: `var(--${startup.logoColor}-11)`,
              background: `var(--${startup.logoColor}-3)`,
              borderColor: `var(--${startup.logoColor}-5)`,
              width: 56,
              height: 56,
              fontSize: 18,
            }}
          >
            {startup.logoText}
          </div>
          <Flex direction="column" gap="1">
            <Heading size="6">{startup.name}</Heading>
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
                {startup.status}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* Продукт */}
        <Card id="product" mb="4">
          <Heading size="4" mb="4">
            Продукт
          </Heading>
          <Flex direction="column" gap="3">
            <div>
              <FieldLabel>Описание</FieldLabel>
              <FieldValue>{d.description}</FieldValue>
            </div>
            <Flex gap="8" wrap="wrap">
              <div>
                <FieldLabel>Стадия развития</FieldLabel>
                <FieldValue>{d.stage}</FieldValue>
              </div>
              <div>
                <FieldLabel>Индустрии</FieldLabel>
                <FieldValue>{d.industries}</FieldValue>
              </div>
            </Flex>
            <div>
              <FieldLabel>Технологии</FieldLabel>
              <FieldValue>{d.technologies}</FieldValue>
            </div>
            <div>
              <FieldLabel>Сайт</FieldLabel>
              <Text size="2" as="p" mt="1">
                <Link href={d.website} target="_blank">
                  {d.website}{" "}
                  <ExternalLinkIcon
                    style={{ display: "inline", verticalAlign: "middle" }}
                  />
                </Link>
              </Text>
            </div>
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
                  <Link href="#" size="2">
                    {d.presentationName}
                  </Link>
                  <Text size="1" color="gray">
                    {d.presentationSize}
                  </Text>
                </Flex>
              </Flex>
            </div>
          </Flex>
        </Card>

        {/* Компания */}
        <Card id="company" mb="4">
          <Heading size="4" mb="4">
            Компания
          </Heading>
          <Flex direction="column" gap="3">
            <Flex gap="8" wrap="wrap">
              <div style={{ minWidth: 200 }}>
                <FieldLabel>
                  Страна регистрации юридического лица или ИП
                </FieldLabel>
                <FieldValue>{d.registrationCountry}</FieldValue>
              </div>
              <div>
                <FieldLabel>Год регистрации</FieldLabel>
                <FieldValue>{d.registrationYear}</FieldValue>
              </div>
            </Flex>
            <Flex gap="8" wrap="wrap">
              <div style={{ minWidth: 200 }}>
                <FieldLabel>ИНН</FieldLabel>
                <FieldValue>{d.inn}</FieldValue>
              </div>
              <div>
                <FieldLabel>Юридическое лицо или ИП</FieldLabel>
                <FieldValue>{d.legalEntity}</FieldValue>
              </div>
            </Flex>
            <div>
              <FieldLabel>Где фактически базируется штаб квартира</FieldLabel>
              <FieldValue>{d.hqCountry}</FieldValue>
            </div>
            <div>
              <FieldLabel>Есть продажи</FieldLabel>
              <FieldValue>{d.hasSales ? "Да" : "Нет"}</FieldValue>
            </div>
          </Flex>
        </Card>

        {/* Выручка */}
        <Card id="revenue" mb="4">
          <Heading size="4" mb="4">
            Выручка
          </Heading>
          {d.revenue.length > 0 ? (
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>
                    <Text size="2" style={{ color: "var(--pink-9)" }}>
                      Год
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>
                    <Text size="2" style={{ color: "var(--pink-9)" }}>
                      Сумма
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {d.revenue.map((r) => (
                  <Table.Row key={r.year}>
                    <Table.Cell>{r.year}</Table.Cell>
                    <Table.Cell>{r.amount}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ) : (
            <div className="empty-state">
              <Text size="2" color="gray">
                Данные о выручке отсутствуют
              </Text>
            </div>
          )}
        </Card>

        {/* Успешные пилоты */}
        <Card id="pilots" mb="4">
          <Heading size="4" mb="4">
            Успешные пилоты
          </Heading>
          {d.pilots.length > 0 ? (
            <Flex direction="column" gap="3">
              {d.pilots.map((pilot, i) => (
                <Card key={i} variant="surface">
                  <Text size="2" weight="bold" as="p">
                    {pilot.company}
                  </Text>
                  <Text size="2" color="gray" as="p" mt="1">
                    {pilot.description}
                  </Text>
                </Card>
              ))}
            </Flex>
          ) : (
            <div className="empty-state">
              <Text size="2" color="gray">
                У стартапа нет пилотов
              </Text>
            </div>
          )}
        </Card>

        {/* Инвестиции */}
        <Card id="investments" mb="4">
          <Heading size="4" mb="4">
            Инвестиции
          </Heading>
          <Flex direction="column" gap="3">
            <div>
              <FieldLabel>Привлекаете инвестиции</FieldLabel>
              <FieldValue>{d.seekingInvestment ? "Да" : "Нет"}</FieldValue>
            </div>
            {d.seekingInvestment && (
              <>
                <div>
                  <FieldLabel>Раунд</FieldLabel>
                  <FieldValue>{d.investmentRound}</FieldValue>
                </div>
                <div>
                  <FieldLabel>Запрашиваемая сумма</FieldLabel>
                  <FieldValue>{d.investmentAmount}</FieldValue>
                </div>
              </>
            )}
          </Flex>
        </Card>

        {/* Контактная информация */}
        <Card id="contacts" mb="4">
          <Heading size="4" mb="4">
            Контактная информация
          </Heading>
          <Flex direction="column" gap="3">
            <div>
              <FieldLabel>Имя и фамилия контактного лица</FieldLabel>
              <FieldValue>{d.contactName}</FieldValue>
            </div>
            <div>
              <FieldLabel>Email контактного лица</FieldLabel>
              <Text size="2" as="p" mt="1">
                <Link href={`mailto:${d.contactEmail}`}>
                  {d.contactEmail}
                </Link>
              </Text>
            </div>
            <div>
              <FieldLabel>Телефон контактного лица</FieldLabel>
              <Text size="2" as="p" mt="1">
                <Link href={`tel:${d.contactPhone}`}>{d.contactPhone}</Link>
              </Text>
            </div>
          </Flex>
        </Card>

        {/* Footer */}
        <Flex
          direction="column"
          align="center"
          gap="1"
          py="6"
          mt="4"
          style={{ borderTop: "1px solid var(--gray-4)" }}
        >
          <Text size="1" color="gray" align="center">
            &copy; 1997&ndash;2026 ПАО СберБанк. Генеральная лицензия на
            осуществление банковских операций от 11 августа 2015 года,
            sberbank.ru
          </Text>
          <Text size="1" color="gray">
            Регистрационный номер — 1481.{" "}
            <Link href="#" size="1">
              Политика обработки данных
            </Link>
            .{" "}
            <Link href="#" size="1">
              Условия обработки Cookies
            </Link>
          </Text>
        </Flex>
      </div>

      {/* Right Sidebar Navigation */}
      <div className="detail-sidebar">
        <nav className="detail-nav">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`detail-nav-item ${activeSection === section.id ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.id);
              }}
            >
              {section.label}
            </a>
          ))}
        </nav>
        <div style={{ padding: "16px 20px" }}>
          <Button
            variant="outline"
            size="3"
            style={{ width: "100%" }}
            color="gray"
          >
            Предложить пилот
          </Button>
        </div>
      </div>
    </div>
  );
}
