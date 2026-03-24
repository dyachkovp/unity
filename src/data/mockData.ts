export interface StartupDetail {
  description: string;
  stage: string;
  industries: string;
  technologies: string;
  website: string;
  presentationName: string;
  presentationSize: string;
  registrationCountry: string;
  registrationYear: number;
  inn: string;
  legalEntity: string;
  hqCountry: string;
  hasSales: boolean;
  revenue: { year: number; amount: string }[];
  pilots: { company: string; description: string }[];
  seekingInvestment: boolean;
  investmentRound: string;
  investmentAmount: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface Startup {
  id: number;
  name: string;
  shortDescription: string;
  tags: string[];
  logoText: string;
  logoColor: string;
  status: string;
  detail: StartupDetail;
}

export const startups: Startup[] = [
  {
    id: 1,
    name: "On-health",
    shortDescription:
      "Цифровая ИИ платформа для лечебных протоколов питания, а также внедрения диеты в программы реабилитации.",
    tags: ["GenAI", "AI/ML", "Computer Vision", "SaaS"],
    logoText: "OH",
    logoColor: "green",
    status: "В активном поиске инвестиций",
    detail: {
      description:
        "Цифровая ИИ платформа для лечебных протоколов питания, а также внедрения диеты в программах абилитации и реабилитации детей с РАС. Персонализированное питание для людей с особыми потребностями. Платформа анализирует индивидуальные показатели здоровья и формирует персональные рекомендации по питанию с учётом диагноза, аллергий и предпочтений пациента.",
      stage: "MVP",
      industries: "HealthTech",
      technologies: "GenAI, AI/ML, Computer Vision, SaaS",
      website: "https://on-health.ru",
      presentationName: "On-health_pitch_2024.pdf",
      presentationSize: "3.2 MB",
      registrationCountry: "Россия",
      registrationYear: 2023,
      inn: "7203560829",
      legalEntity:
        'Общество с Ограниченной Ответственностью "Включи Здоровье"',
      hqCountry: "Россия",
      hasSales: false,
      revenue: [{ year: 2024, amount: "2 031 000 RUB" }],
      pilots: [],
      seekingInvestment: true,
      investmentRound: "Pre-seed",
      investmentAmount: "15 000 000 RUB",
      contactName: "Алексей Морозов",
      contactEmail: "a.morozov@on-health.ru",
      contactPhone: "+7 (912) 345-67-89",
    },
  },
  {
    id: 2,
    name: "ArtVisionAi",
    shortDescription:
      "ArtVisionAi — это цифровой инструмент психоэмоциональной диагностики, который помогает быстро оценить состояние пациента.",
    tags: ["GenAI"],
    logoText: "AV",
    logoColor: "blue",
    status: "В активном поиске инвестиций",
    detail: {
      description:
        "ArtVisionAi — это цифровой инструмент психоэмоциональной диагностики, который помогает быстро и точно оценить состояние пациента по анализу рисунков и визуальных паттернов. Система использует нейросетевой анализ для выявления маркеров стресса, тревожности и депрессии. Применяется в клиниках, школах и центрах психологической поддержки.",
      stage: "Seed",
      industries: "HealthTech, EdTech",
      technologies: "GenAI, Computer Vision, NLP",
      website: "https://artvision.ai",
      presentationName: "ArtVisionAi_deck_2024.pdf",
      presentationSize: "5.1 MB",
      registrationCountry: "Россия",
      registrationYear: 2022,
      inn: "7701456832",
      legalEntity: 'Общество с Ограниченной Ответственностью "АртВижн"',
      hqCountry: "Россия",
      hasSales: true,
      revenue: [
        { year: 2023, amount: "850 000 RUB" },
        { year: 2024, amount: "4 200 000 RUB" },
      ],
      pilots: [
        {
          company: "Городская клиническая больница №15",
          description:
            "Пилотирование системы диагностики в отделении психотерапии. Обработано 1200 рисунков, точность выявления 87%.",
        },
      ],
      seekingInvestment: true,
      investmentRound: "Seed",
      investmentAmount: "30 000 000 RUB",
      contactName: "Мария Светлова",
      contactEmail: "m.svetlova@artvision.ai",
      contactPhone: "+7 (903) 221-44-56",
    },
  },
  {
    id: 3,
    name: "YMA",
    shortDescription:
      "UMA – платформа для работы над составными заказами. Прозрачное управление составными заказами для производственных компаний.",
    tags: ["SaaS", "B2B", "Marketplace"],
    logoText: "uma",
    logoColor: "red",
    status: "Открыт к партнёрствам",
    detail: {
      description:
        "UMA – платформа для работы над составными заказами. Прозрачное управление составными заказами для производственных компаний. Система позволяет декомпозировать сложные заказы на подзадачи, распределять их между подрядчиками, отслеживать статус каждого этапа и контролировать качество в реальном времени.",
      stage: "Round A",
      industries: "Логистика, Производство",
      technologies: "SaaS, Big Data, IoT",
      website: "https://uma-platform.ru",
      presentationName: "UMA_investor_deck.pdf",
      presentationSize: "4.7 MB",
      registrationCountry: "Россия",
      registrationYear: 2021,
      inn: "5024198765",
      legalEntity: 'Общество с Ограниченной Ответственностью "ЮМА Технологии"',
      hqCountry: "Россия",
      hasSales: true,
      revenue: [
        { year: 2022, amount: "1 500 000 RUB" },
        { year: 2023, amount: "12 800 000 RUB" },
        { year: 2024, amount: "34 500 000 RUB" },
      ],
      pilots: [
        {
          company: "ПАО Северсталь",
          description:
            "Автоматизация управления составными заказами на металлопрокат. Сокращение сроков обработки заказов на 35%.",
        },
        {
          company: "ГК Самолёт",
          description:
            "Управление цепочкой поставок строительных материалов. Снижение потерь при логистике на 20%.",
        },
      ],
      seekingInvestment: true,
      investmentRound: "Round A",
      investmentAmount: "120 000 000 RUB",
      contactName: "Дмитрий Волков",
      contactEmail: "d.volkov@uma-platform.ru",
      contactPhone: "+7 (495) 789-01-23",
    },
  },
  {
    id: 4,
    name: "DataLens",
    shortDescription:
      "Аналитическая платформа для визуализации и исследования данных. Интеграция с основными источниками данных и BI-инструментами.",
    tags: ["AI/ML", "Big Data", "Analytics", "SaaS"],
    logoText: "DL",
    logoColor: "violet",
    status: "Открыт к партнёрствам",
    detail: {
      description:
        "Аналитическая платформа нового поколения для визуализации и исследования данных. Поддерживает интеграцию с более чем 50 источниками данных, включая PostgreSQL, ClickHouse, BigQuery. Встроенный AI-ассистент помогает строить запросы на естественном языке и автоматически выявлять аномалии в данных.",
      stage: "Growth",
      industries: "FinTech, RetailTech, Analytics",
      technologies: "AI/ML, Big Data, NLP, SaaS",
      website: "https://datalens.tech",
      presentationName: "DataLens_overview_2024.pdf",
      presentationSize: "6.3 MB",
      registrationCountry: "Россия",
      registrationYear: 2020,
      inn: "7743012345",
      legalEntity: 'Общество с Ограниченной Ответственностью "ДатаЛенс"',
      hqCountry: "Россия",
      hasSales: true,
      revenue: [
        { year: 2022, amount: "8 500 000 RUB" },
        { year: 2023, amount: "42 000 000 RUB" },
        { year: 2024, amount: "98 000 000 RUB" },
      ],
      pilots: [
        {
          company: "Тинькофф Банк",
          description:
            "Внедрение визуализации клиентской аналитики для отдела маркетинга. Скорость формирования отчётов выросла в 4 раза.",
        },
        {
          company: "X5 Group",
          description:
            "Анализ товарных остатков и прогнозирование спроса по 1200 торговым точкам.",
        },
      ],
      seekingInvestment: false,
      investmentRound: "",
      investmentAmount: "",
      contactName: "Елена Кузнецова",
      contactEmail: "e.kuznetsova@datalens.tech",
      contactPhone: "+7 (916) 555-33-77",
    },
  },
  {
    id: 5,
    name: "CyberGuard",
    shortDescription:
      "Решение для кибербезопасности на основе ИИ. Автоматическое обнаружение угроз и реагирование на инциденты в реальном времени.",
    tags: ["AI/ML", "Cybersecurity", "B2B"],
    logoText: "CG",
    logoColor: "orange",
    status: "В активном поиске инвестиций",
    detail: {
      description:
        "Комплексное решение для кибербезопасности на основе искусственного интеллекта. Платформа обеспечивает автоматическое обнаружение угроз, поведенческий анализ пользователей и реагирование на инциденты в реальном времени. Система обрабатывает до 10 миллионов событий безопасности в секунду и интегрируется с существующими SIEM-системами.",
      stage: "Seed",
      industries: "Кибербезопасность, B2B",
      technologies: "AI/ML, Big Data, NLP",
      website: "https://cyberguard.ru",
      presentationName: "CyberGuard_pitch.pdf",
      presentationSize: "2.8 MB",
      registrationCountry: "Россия",
      registrationYear: 2023,
      inn: "7710987654",
      legalEntity:
        'Общество с Ограниченной Ответственностью "КиберГард Секьюрити"',
      hqCountry: "Россия",
      hasSales: true,
      revenue: [{ year: 2024, amount: "5 600 000 RUB" }],
      pilots: [
        {
          company: "Росатом",
          description:
            "Пилотное тестирование системы обнаружения аномалий в корпоративной сети. Выявлено 23 ранее неизвестных инцидента за 3 месяца.",
        },
      ],
      seekingInvestment: true,
      investmentRound: "Seed",
      investmentAmount: "50 000 000 RUB",
      contactName: "Игорь Петров",
      contactEmail: "i.petrov@cyberguard.ru",
      contactPhone: "+7 (926) 111-22-33",
    },
  },
  {
    id: 6,
    name: "EcoTrack",
    shortDescription:
      "Платформа для мониторинга и управления углеродным следом предприятий. ESG-отчётность и рекомендации по снижению выбросов.",
    tags: ["IoT", "GreenTech", "SaaS"],
    logoText: "ET",
    logoColor: "green",
    status: "Открыт к партнёрствам",
    detail: {
      description:
        "Платформа для мониторинга и управления углеродным следом предприятий. Автоматизированный сбор данных с IoT-датчиков, формирование ESG-отчётности по международным стандартам GRI и SASB. Система предоставляет рекомендации по оптимизации энергопотребления и снижению выбросов CO₂ на основе машинного обучения.",
      stage: "MVP",
      industries: "GreenTech, Промышленность",
      technologies: "IoT, AI/ML, Big Data, SaaS",
      website: "https://ecotrack.green",
      presentationName: "EcoTrack_pitch_2024.pdf",
      presentationSize: "4.1 MB",
      registrationCountry: "Россия",
      registrationYear: 2023,
      inn: "7801234567",
      legalEntity: 'Общество с Ограниченной Ответственностью "ЭкоТрек"',
      hqCountry: "Россия",
      hasSales: false,
      revenue: [],
      pilots: [],
      seekingInvestment: true,
      investmentRound: "Pre-seed",
      investmentAmount: "10 000 000 RUB",
      contactName: "Анна Зелёнова",
      contactEmail: "a.zelenova@ecotrack.green",
      contactPhone: "+7 (981) 444-55-66",
    },
  },
  {
    id: 7,
    name: "MedAssist",
    shortDescription:
      "ИИ-ассистент для врачей: автоматизация заполнения медицинской документации и поддержка принятия клинических решений.",
    tags: ["GenAI", "HealthTech", "B2B"],
    logoText: "MA",
    logoColor: "cyan",
    status: "В активном поиске инвестиций",
    detail: {
      description:
        "ИИ-ассистент для врачей, который автоматизирует заполнение медицинской документации на основе голосового ввода и поддерживает принятие клинических решений. Распознавание медицинской речи с точностью 96%, автоматическое формирование структурированных записей в формате FHIR. Экономит врачам до 2 часов рабочего времени ежедневно.",
      stage: "Seed",
      industries: "HealthTech",
      technologies: "GenAI, NLP, SaaS",
      website: "https://medassist.ai",
      presentationName: "MedAssist_investor_deck.pdf",
      presentationSize: "5.5 MB",
      registrationCountry: "Россия",
      registrationYear: 2022,
      inn: "7702345678",
      legalEntity: 'Общество с Ограниченной Ответственностью "МедАссист"',
      hqCountry: "Россия",
      hasSales: true,
      revenue: [
        { year: 2023, amount: "3 200 000 RUB" },
        { year: 2024, amount: "18 500 000 RUB" },
      ],
      pilots: [
        {
          company: "Медси",
          description:
            "Внедрение голосового ассистента в 12 клиниках сети. Сокращение времени на документацию на 45%.",
        },
        {
          company: "ЕМЦ",
          description:
            "Автоматизация формирования выписных эпикризов. Обработано более 5000 документов.",
        },
      ],
      seekingInvestment: true,
      investmentRound: "Round A",
      investmentAmount: "80 000 000 RUB",
      contactName: "Сергей Доктором",
      contactEmail: "s.doktorov@medassist.ai",
      contactPhone: "+7 (905) 777-88-99",
    },
  },
  {
    id: 8,
    name: "FinBot",
    shortDescription:
      "Чат-бот для финансового консультирования. Персональные рекомендации по инвестициям и управлению бюджетом на основе ИИ.",
    tags: ["GenAI", "FinTech", "B2C"],
    logoText: "FB",
    logoColor: "indigo",
    status: "Открыт к партнёрствам",
    detail: {
      description:
        "Чат-бот для персонального финансового консультирования на основе генеративного ИИ. Анализирует финансовое поведение пользователя, формирует индивидуальные стратегии накопления и инвестирования. Интегрируется с банковскими API для автоматического анализа транзакций. Поддерживает голосовое взаимодействие и работает в Telegram, WhatsApp и мобильном приложении.",
      stage: "Growth",
      industries: "FinTech",
      technologies: "GenAI, NLP, Big Data",
      website: "https://finbot.money",
      presentationName: "FinBot_pitch_deck.pdf",
      presentationSize: "3.9 MB",
      registrationCountry: "Россия",
      registrationYear: 2021,
      inn: "7705678901",
      legalEntity: 'Общество с Ограниченной Ответственностью "ФинБот"',
      hqCountry: "Россия",
      hasSales: true,
      revenue: [
        { year: 2022, amount: "2 100 000 RUB" },
        { year: 2023, amount: "15 400 000 RUB" },
        { year: 2024, amount: "52 000 000 RUB" },
      ],
      pilots: [
        {
          company: "Газпромбанк",
          description:
            "Интеграция FinBot в мобильное приложение банка. 150 000 активных пользователей за первые 3 месяца.",
        },
      ],
      seekingInvestment: false,
      investmentRound: "",
      investmentAmount: "",
      contactName: "Ольга Финансова",
      contactEmail: "o.finansova@finbot.money",
      contactPhone: "+7 (917) 333-44-55",
    },
  },
];

export interface FilterCategory {
  id: string;
  label: string;
  options: string[];
}

export const filterCategories: FilterCategory[] = [
  {
    id: "stage",
    label: "Стадия развития",
    options: ["Pre-seed", "Seed", "Round A", "Round B", "Round C+", "IPO"],
  },
  {
    id: "industry",
    label: "Индустрии",
    options: [
      "HealthTech",
      "FinTech",
      "EdTech",
      "RetailTech",
      "PropTech",
      "AgriTech",
      "Логистика",
      "Кибербезопасность",
    ],
  },
  {
    id: "technology",
    label: "Технологии",
    options: [
      "AI/ML",
      "GenAI",
      "Computer Vision",
      "NLP",
      "Big Data",
      "IoT",
      "Blockchain",
      "AR/VR",
    ],
  },
  {
    id: "business_model",
    label: "Модель бизнеса",
    options: ["B2B", "B2C", "B2B2C", "SaaS", "Marketplace", "D2C"],
  },
  {
    id: "registration_country",
    label: "Страна регистрации компании",
    options: [
      "Россия",
      "США",
      "Великобритания",
      "Израиль",
      "Сингапур",
      "ОАЭ",
    ],
  },
  {
    id: "hq_country",
    label: "Страна расположения штаб квартиры",
    options: [
      "Россия",
      "США",
      "Великобритания",
      "Израиль",
      "Сингапур",
      "ОАЭ",
    ],
  },
];

export interface StartupList {
  id: string;
  name: string;
  description?: string;
  color: string;
  startupIds: number[];
  createdAt: number;
}

export const defaultLists: StartupList[] = [
  {
    id: "list-1",
    name: "HealthTech подборка",
    description: "Стартапы в сфере здравоохранения",
    color: "green",
    startupIds: [1, 2, 7],
    createdAt: Date.now() - 86400000,
  },
  {
    id: "list-2",
    name: "Для обсуждения",
    description: "Кандидаты на следующий инвестиционный комитет",
    color: "indigo",
    startupIds: [3, 4, 5],
    createdAt: Date.now(),
  },
];

export const navItems = [
  { id: "startups", label: "Стартапы", active: true },
  { id: "lists", label: "Мои списки", active: false },
  { id: "scouting", label: "Скаутинг", active: false },
  { id: "investments", label: "Инвестиции", active: false },
  { id: "clubs", label: "Клубы инвесторов", active: false, badge: true },
  { id: "investors", label: "Инвесторы", active: false },
  { id: "corporations", label: "Корпорации", active: false },
];
