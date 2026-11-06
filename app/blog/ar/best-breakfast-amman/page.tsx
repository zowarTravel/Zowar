import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Tajawal } from "next/font/google";
import BlogTranslations from "@/app/components/blog-translations";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const URL = "https://zowar.net/blog/ar/best-breakfast-amman";
const EN_URL = "https://zowar.net/blog/best-breakfast-amman";

export const metadata: Metadata = {
  title: "أفضل مطاعم الفطور في عمّان – دليل محلي 2026",
  description:
    "دليل كامل للفطور في عمّان: من فلافل القدس وأبو جبارة وخشوقة وهاشم، إلى شمس البلد ورمان وكافيه رومي وبلو فيج. وين تفطر، شو تطلب، ومتى تروح.",
  alternates: {
    canonical: URL,
    languages: { en: EN_URL, ar: URL, "x-default": EN_URL },
  },
  openGraph: {
    title: "أفضل مطاعم الفطور في عمّان – دليل محلي 2026",
    description:
      "من كشك فلافل يعمل منذ 1966 إلى تراس يطل على جبل القلعة: دليلك للفطور في عمّان.",
    url: URL,
    locale: "ar_JO",
    type: "article",
    images: [{ url: "/images/blog/amman-traditional-cafe-interior.jpg", alt: "مقهى تقليدي في شارع الرينبو في عمّان" }],
  },
  keywords: [
    "أفضل فطور في عمان",
    "مطاعم فطور عمان",
    "فطور أردني",
    "فطور شعبي عمان",
    "فلافل القدس",
    "مطعم هاشم",
    "أبو جبارة",
    "خشوقة",
    "شمس البلد",
    "شارع الرينبو",
    "جبل اللويبدة",
    "أماكن فطور في الأردن",
  ],
};

type Place = {
  name: string;
  nameEn: string;
  neighborhood: string;
  highlight: string;
  description: string;
  order: string;
  tip: string;
};

const traditional: Place[] = [
  {
    name: "فلافل القدس",
    nameEn: "Al-Quds Falafel",
    neighborhood: "شارع الرينبو، جبل عمّان",
    highlight: "أشهر كشك فلافل في عمّان منذ 1966",
    description: `جاء مؤسس هذا الكشك الصغير من القدس، ومن هنا جاء الاسم. منذ افتتاحه عام 1966 صار فلافل القدس من أشهر محطات الفطور في عمّان، وعلى الأرجح أشهر كشك فلافل في شارع الرينبو.

الفكرة بسيطة عن قصد: كاونتر صغير، بلا جلسات، والطلب سفري فقط. الفلافل تطلع ساخنة، مقرمشة من برّا وخضراء من جوّا من كثرة الأعشاب، وتُقدَّم في خبز فرنسي مع البندورة والبقدونس والمخلل ورشّة طحينة. هذا كل ما في القائمة، وهذا كل ما تحتاجه.

ما يميّز المكان ليس عمره فقط، بل من يزوره. جلالة الملك عبدالله وأفراد من العائلة المالكة توقّفوا هنا للفطور، وما زال أهل الحي يتحدثون عن ذلك. وتقييمه على تريب أدفايزر 4.5 من آلاف المراجعات؛ سمعة بُنيت على الطريقة القديمة.`,
    order: "شيء واحد فقط: ساندويش الفلافل، طازج من المقلى.",
    tip: "أول دفعة في الصباح هي الأفضل. روح قبل الساعة 9، لأنه يخلص.",
  },
  {
    name: "أبو جبارة",
    nameEn: "Abu Jbara",
    neighborhood: "عدة فروع: شارع المدينة المنورة، شارع الجاردنز، شارع مكة",
    highlight: "الفطور الأردني الكامل، كما يجب أن يكون",
    description: `أبو جبارة من أكثر أسماء الفطور التي يُعتمد عليها في عمّان منذ افتتاحه عام 2006، وله اليوم ثلاثة فروع رسمية في المدينة. يشتهر بشيء واحد قبل كل شيء: أن يقدّم لك الفطور الأردني كاملًا، دفعة واحدة، على طاولة تمتلئ بسرعة.

الفرشة هنا تغطي كل ما يحتويه صباح أردني تقليدي: حمص بزيت الزيتون، فول مدمّس على أصوله، فتة بالخبز واللبن والحمص، فلافل طازجة، وخبز عربي ساخن لا يتوقف عن الوصول من المطبخ. ومعها السلطات والزيتون والشاي.

فطور كامل لشخصين يكلّف دنانير معدودة، ولهذا يجذب جمهورًا وفيًّا من أهل البلد والزوار على حد سواء. وفرع واحد على الأقل يفتح 24 ساعة، ما يجعله خيارًا عمليًا لمن يصل متأخرًا أو يصحو قبل الجميع.`,
    order: "الفرشة الكاملة: حمص، فول، فتة، فلافل، وخبز طازج.",
    tip: "أحد الفروع يفتح 24 ساعة. صباحات أيام الأسبوع أهدأ من العطلة.",
  },
  {
    name: "خشوقة",
    nameEn: "Khashoka",
    neighborhood: "عبدون وعدة مواقع في عمّان",
    highlight: "فطور ريفي، دسم، وأردني بلا تكلّف",
    description: `"خشوقة" هي الملعقة بالعامية، والكلمة أصلها تركي، والاسم يلخّص فلسفة المطعم: أكل يُؤكل من صحن عميق، على مهل، ومعه خبز طيّب.

خشوقة مطعم فطور عربي بطابع ريفي توسّع إلى ما بعد عمّان، فصار له فروع في العقبة وحتى في الولايات المتحدة، في مدينة ريتشاردسون بولاية تكساس. لكن روحه أردنية بالكامل: مكان تأتيه العائلات لتأكل كما يجب.

أبرز الأطباق قلاية الكبدة، تُطبخ بالبهارات في مقلاة حديد حتى تصبح غنية ومحمّرة الأطراف، وقلاية الشكشوكة، بيض في صلصة بندورة متبّلة يصل إلى الطاولة وهو يغلي. وفي القائمة أيضًا الحمص، فطائر الجبنة والزعتر، الفول، الفلافل، وكل أصناف الصباح التقليدية. يفتح من 8 صباحًا حتى منتصف الليل.`,
    order: "قلاية كبدة أو قلاية شكشوكة، ومعها فطيرة جبنة وزعتر.",
    tip: "مزدحم بالعائلات في عطلة نهاية الأسبوع. صباح يوم عادي أريح.",
  },
  {
    name: "أبو محجوب",
    nameEn: "Abu Mahjoub",
    neighborhood: "وسط البلد",
    highlight: "سرّ الحي الصباحي الذي لا يحتاج إلى إعلان",
    description: `يقع أبو محجوب في الجزء القديم من عمّان، حيث الفطور شغلة جدية منذ أجيال. مطعم لا يحتاج إلى إعلان؛ زبائنه الدائمون يصلون إليه بالعادة، والزوار يصلون بالسؤال. والجمهور يقول كل شيء: سائقو تكسي، أصحاب محلات، طلاب، وأحيانًا مسافر ابتعد عن المسار السياحي.

القائمة تقليدية بالكامل: فول مطبوخ على مهل مع زيت الزيتون، حمص طازج ناعم وثقيل كما يجب، بيض مسلوق، خبز، زيتون. فطور يكلّف شبه لا شيء ويبقى معك طوال الصباح.

ما يقدّمه أبو محجوب ولا يستطيع كثيرون تقليده هو الإحساس بأنك تأكل تمامًا كما أكل أهل عمّان دائمًا، بلا أي استعراض. لا براندينغ ولا إضاءة إنستغرام؛ أكل طيب، خدمة سريعة، وغرفة مليئة بناس يأتون منذ سنين.`,
    order: "فول بزيت الزيتون، حمص، بيض مسلوق، وخبز طازج.",
    tip: "تعال قبل الساعة 9 لتجد مكانًا. الدفع نقدًا فقط، والأسعار منخفضة.",
  },
  {
    name: "مطبخ أسمى",
    nameEn: "Asma Kitchen",
    neighborhood: "وسط البلد",
    highlight: "مطعم بحجم غرفة الجلوس: طاولتان، مطبخ واحد، وجمهور محلي",
    description: `مطبخ أسمى من الأماكن التي لا تعلن عن نفسها لأنها لا تحتاج إلى ذلك. طاولتان، مطبخ صغير، وأكل أردني تقليدي يطبخه شخص يعرف تمامًا ما يفعل. يصفه البعض بـ"مطعم غرفة الجلوس"، والوصف دقيق: الجو حميم، الكميات سخية، والزبائن كلهم تقريبًا من أهل البلد.

في مدينة صارت فيها أماكن فطور كثيرة مصقولة لترضي الجميع، يبقى مطبخ أسمى صغيرًا عن قصد. الأكل هو ما يخرج من مطبخ بيت أردني: فول مطبوخ صح، حمص مضروب طازج، خبز ساخن، وبيض حسب الطلب. فطور تشعر أنه صُنع لك تحديدًا، لأنه في غرفة فيها طاولتان، صُنع لك فعلًا.

قلة الطاولات تعني أن المكان لا يزدحم، لكنها تعني أيضًا أنك قد لا تجد طاولة إلا إذا جئت مبكرًا أو قبلت الانتظار. ومعظم الزبائن الدائمين يرون أن الأمر يستحق.`,
    order: "ما يطبخونه ذلك الصباح. اسأل شو الطازج اليوم.",
    tip: "الدفع نقدًا فقط. طاولتان فقط، فتعال مبكرًا أو توقّع الانتظار.",
  },
  {
    name: "مطعم هاشم",
    nameEn: "Hashem Restaurant",
    neighborhood: "شارع الملك فيصل، وسط البلد",
    highlight: "منذ 1952، مفتوح 24 ساعة: أشهر عنوان للفلافل في عمّان",
    description: `هاشم ليس مطعمًا بالمعنى المعتاد. لا توجد قائمة مطبوعة، فالأطباق نفسها تُقدَّم كل يوم منذ افتتاحه في شارع الملك فيصل بوسط البلد عام 1952، ولم يشعر أحد بالحاجة إلى كتابتها: فلافل، حمص، فول، متبّل، فتة حمص. هذا هو العرض، وكان كافيًا ليجعل هاشم من أكثر أماكن الفطور زيارة في الأردن منذ أكثر من سبعين عامًا.

الجلسة كلها في الهواء الطلق: طاولات طويلة على الرصيف بين بنايتين في وسط البلد، وكراسٍ بلاستيكية بيضاء تمتلئ بسرعة في الصباح. الفلافل هنا من النوع المحشي، مقلية حتى تصير غامقة ومقرمشة، بحشوة من البصل المتبّل والكزبرة تميّزها عن الأنواع الأبسط. كل ما في القائمة نباتي، ولا شيء يكلّف أكثر من دنانير قليلة.

جمهور هاشم لم يكترث يومًا للمكانة. أكل هنا أفراد من العائلة المالكة، وأكل هنا رحّالة وسائقو تكسي وصحفيو طعام وكل من بينهم. وهاشم مدرج في قائمة World's 50 Best Discovery وظهر في مجلة Saveur، لكنه لا يحمل أي تكلّف من الذي يرافق عادة هذا النوع من الشهرة. مفتوح عند منتصف الليل وما زال مفتوحًا عند الفجر، فيصلح عشاءً متأخرًا جدًا أو أول وجبة في اليوم.`,
    order: "الفلافل المحشية، ومعها حمص وفول للفرشة الكاملة.",
    tip: "مفتوح 24 ساعة، والفلافل في أطيب حالاتها بين 6 و9 صباحًا. الدفع نقدًا، والأسعار منخفضة جدًا.",
  },
];

const modern: Place[] = [
  {
    name: "شمس البلد",
    nameEn: "Shams Al Balad",
    neighborhood: "شارع الرينبو، جبل عمّان",
    highlight: "من محل ورد إلى أحد أشهر أماكن الفطور في عمّان",
    description: `بدأ شمس البلد محلَّ ورد صغيرًا يهتم بالتصميم والاستدامة، ثم تطوّر تدريجيًا إلى مقهى، ثم إلى مطعم متكامل. والسبب مطبخ كان يفعل شيئًا مختلفًا فعلًا: يقدّم أطباق فطور نادرًا ما تراها خارج بيوت الأردنيين، بمكوّنات عضوية وموسمية من المنتجين المحليين مباشرة.

اليوم هو من أكثر الأسماء حضورًا في مشهد الطعام في عمّان، ومدرج في قائمة World's 50 Best Discovery، إلى جانب أكثر المطاعم المستقلة إثارة للاهتمام في العالم. والتراس المطل على جبل القلعة والقصر الأموي عبر الوادي من أجمل أماكن الفطور في المدينة.

القائمة رسالة حب للمطبخ البيتي الأردني، بصياغة مدروسة: فول بلمسة مختلفة، كرات لبنة بالأعشاب، عجة بقدونس بالبصل والسماق، مكدوس، خبز طابون يُخبز في المطعم، وقهوة يمنية من مصدرها مباشرة. تقليدي في مكوّناته واحترامه للأكل، ومقصود في كل تفصيلة.`,
    order: "عجة البقدونس، كرات اللبنة، وإبريق قهوة يمنية. واجلس على التراس.",
    tip: "احجز مسبقًا لصباحات العطلة لأن التراس يمتلئ. من أماكن الفطور القليلة في عمّان التي يستحق فيها الحجز.",
  },
  {
    name: "رمان كوليكتيف",
    nameEn: "Rumman Collective",
    neighborhood: "شارع الرينبو، جبل عمّان",
    highlight: "برانش نهاية الأسبوع في مساحة ثقافية مع حديقة داخلية",
    description: `يحمل رمان روح اسمه في كل زاوية: دافئ، متعدد الطبقات، ومليء بالتفاصيل غير المتوقعة. المدخل تزيّنه أشجار الليمون والرمان، والداخل سقفه عالٍ ومزيج من الحِرف الإقليمية وقطع التصميم المختارة، والجلسة الخارجية على الشرفة تطل على حديقة خضراء تشعرك بأنك بعيد عن الشارع.

رمان ليس مطعمًا فقط، بل مساحة اجتماعية وثقافية: جزء معرض، جزء ملتقى، وجزء مطبخ. الأكل يميل إلى النكهات المتوسطية والعربية بأسلوب موسمي مدروس. برانش نهاية الأسبوع، السبت والأحد من 10 صباحًا حتى 2 ظهرًا، هو أهم ما يُقدَّم، بفرشة شملت أطباق فطور على الطريقة الشامية وقائمة تتغير مع الموسم.

والملكية الأردنية توصي به ضمن الوجهات المستدامة والمجتمعية في عمّان، وهذا يعكس هدف المكان الأوسع: ربط المكوّنات المحلية والحِرف والحكايات بطريقة تتجاوز الوجبة.`,
    order: "فرشة البرانش يوم السبت أو الأحد. تعال قرب موعد الافتتاح لأفضل طاولة.",
    tip: "يمكن زيارته في أيام الأسبوع للقهوة والأطباق الخفيفة، لكن البرانش هو سبب المجيء.",
  },
  {
    name: "كافيه رومي",
    nameEn: "Rumi Café",
    neighborhood: "شارع كلية الشريعة، جبل اللويبدة",
    highlight: "أفضل قهوة مختصة في اللويبدة، منذ 2013",
    description: `يقع كافيه رومي بهدوء في شارع جانبي في جبل اللويبدة، الحي الإبداعي الموازي لشارع الرينبو، وهو من أكثر الأماكن المحبوبة في عمّان منذ افتتاحه عام 2013. الاسم تحية للشاعر جلال الدين الرومي، والمقهى يحمل شيئًا من روحه: لا عجلة، ويستحق أن تجلس فيه قليلًا.

الداخل نظيف ومدروس: بلاط أبيض، خشب طبيعي، ونوافذ من الأرض إلى السقف تُفتح على باحة خارجية مظللة. في صباح جميل تأخذ قهوتك إلى الخارج والمدينة ما زالت هادئة، وهي من ألطف الطرق لبدء يوم في عمّان.

رومي ليس مطعم فطور شعبي. القهوة المختصة هي السبب: محاصيل أحادية المصدر محضّرة جيدًا، مع خيارات القهوة العربية والتركية إلى جانب مشروبات الإسبريسو. المطبخ يصنع معجّناته بنفسه، وكيكة البرتقال وخبز الموز صارا من علامات المكان. وتكمل القائمة سندويشات وأطباق خفيفة. يفتح الساعة 7 صباحًا.`,
    order: "قهوة مختصة، عربية أو تركية، مع كيكة البرتقال أو خبز الموز.",
    tip: "الباحة الخارجية أجمل مكان في صباح منعش. يزدحم من الساعة 9 فصاعدًا.",
  },
  {
    name: "بلو فيج",
    nameEn: "Blue Fig",
    neighborhood: "عبدون، غرب عمّان",
    highlight: "عنوان ثابت في عبدون: قائمة عالمية وتراس خارجي",
    description: `بلو فيج حاضر في المشهد الاجتماعي في عبدون منذ زمن طويل بما يكفي ليصبح مؤسسة بحد ذاته؛ من الأماكن التي تعود إليها عائلات عمّان في صباحات العطلة دون تفكير كثير، لأنها تعرف ما ستحصل عليه وتعرف أنه سيكون جيدًا.

القائمة لا تحاول أن تكون أردنية تقليدية، بل تذهب في الاتجاه المعاكس: أفوكادو توست، فرنش توست، بيض بأشكال مختلفة، بان كيك، وقائمة عالمية أوسع بتأثيرات متوسطية ويونانية وإيطالية. وفيها خيارات أخف مثل سلطات الكينوا والأطباق النباتية. والنتيجة فطور يناسب من كبر في عمّان ومن يزورها لأول مرة.

التراس الخارجي هو عامل الجذب الأساسي: واسع، مظلل جيدًا، وبعيد عن الشارع بما يكفي ليكون مريحًا. القهوة جيدة والخدمة متمرسة. بلو فيج ليس المكان لصباح أردني أصيل، لكنه مكان موثوق جدًا لصباح لطيف.`,
    order: "أفوكادو توست أو فرنش توست، واجلس في الخارج.",
    tip: "مزدحم صباح الجمعة والسبت. تعال قبل الساعة 10 لأفضل طاولة خارجية.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "أفضل مطاعم الفطور في عمّان",
      description:
        "دليل محلي للفطور في عمّان: من فلافل القدس وهاشم وأبو جبارة وخشوقة، إلى شمس البلد ورمان وكافيه رومي وبلو فيج.",
      url: URL,
      image: "https://zowar.net/images/blog/amman-traditional-cafe-interior.jpg",
      datePublished: "2026-11-06",
      dateModified: "2026-11-06",
      author: { "@type": "Organization", name: "زوّار Zowar", url: "https://zowar.net" },
      publisher: {
        "@type": "Organization",
        name: "Zowar",
        url: "https://zowar.net",
        logo: { "@type": "ImageObject", url: "https://zowar.net/logo.png" },
      },
      inLanguage: "ar",
      about: [
        { "@type": "City", name: "عمّان" },
        { "@type": "Country", name: "الأردن" },
      ],
    },
    {
      "@type": "ItemList",
      name: "مطاعم الفطور في عمّان",
      numberOfItems: traditional.length + modern.length,
      itemListElement: [...traditional, ...modern].map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Restaurant",
          name: p.name,
          alternateName: p.nameEn,
          address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" },
        },
      })),
    },
  ],
};

function PlaceCard({ place, index, accent }: { place: Place; index: number; accent: string }) {
  return (
    <section id={`place-${accent}-${index + 1}`}>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold tabular-nums" style={{ color: "rgba(200,105,74,0.18)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-2xl font-semibold text-neutral-950">
            {place.name}
            <span lang="en" className="ms-2 text-base font-normal text-neutral-400">{place.nameEn}</span>
          </h3>
          <p className="mt-0.5 text-sm text-neutral-500">{place.neighborhood}</p>
        </div>
      </div>

      <div className="mt-2 inline-block rounded-full bg-z-orange-soft px-3 py-0.5 text-xs font-semibold text-[#c8694a]">
        {place.highlight}
      </div>

      <div className="mt-4 space-y-4">
        {place.description.split("\n\n").map((para, j) => (
          <p key={j} className="text-base leading-8 text-neutral-700">{para}</p>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/8 bg-white p-4">
          <p className="mb-1.5 text-xs font-bold text-neutral-400">شو تطلب</p>
          <p className="text-sm leading-6 text-neutral-700">{place.order}</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="mb-1.5 text-xs font-bold text-amber-600">نصيحة محلية</p>
          <p className="text-sm leading-6 text-amber-900">{place.tip}</p>
        </div>
      </div>
    </section>
  );
}

export default function BestBreakfastAmmanAr() {
  return (
    <div lang="ar" dir="rtl" className={tajawal.className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-[#faf7f2] text-neutral-900">
        <div className="border-b border-black/8 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4 text-sm">
            <Link href="/?lang=ar" className="text-neutral-500 hover:text-neutral-800 transition">زوّار</Link>
            <span className="text-neutral-300">/</span>
            <Link href="/blog" className="text-neutral-500 hover:text-neutral-800 transition">المدونة</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">أفضل فطور في عمّان</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-z-orange bg-z-orange-soft px-3 py-1 text-xs font-semibold text-[#c8694a]">
              دليل الأكل · عمّان، الأردن
            </div>
            <h1 className="text-3xl font-bold leading-tight text-neutral-950 sm:text-4xl">
              أفضل مطاعم الفطور في عمّان
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              من أكشاك فلافل تُطعم المدينة منذ 1966 إلى تراسات تطل على جبل القلعة:
              دليل محلي للفطور في عمّان، مقسوم بين الشعبي الأصيل والحديث.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>بقلم فريق زوّار · عمّان</span>
              <span>·</span>
              <span>قراءة 12 دقيقة</span>
              <span>·</span>
              <span>محدّث 2026</span>
            </div>
            <BlogTranslations
              prefix="متوفر أيضًا بـ:"
              links={[{ lang: "en", label: "English", href: "/blog/best-breakfast-amman" }]}
            />
          </header>

          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/amman-traditional-cafe-interior.jpg"
                alt="مقهى تقليدي في شارع الرينبو في عمّان بوسائد ملوّنة وإطلالة على المدينة"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">مقهى في شارع الرينبو، حيث يطول الفطور قدر ما تريد</figcaption>
          </figure>

          <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-base leading-8 text-neutral-700">
              الفطور في الأردن ليس وجبة خفيفة. هو تقليديًا أكبر وجبة في اليوم وأكثرها
              لمّة: طاولة مليانة حمص وفول وفلافل ولبنة وزيت وزعتر وبيض وبندورة وزيتون
              وخبز سخن، والشاي ما بيوقف. في عمّان، تحافظ على هذا التقليد مجموعة من
              الأماكن التي تفعل الشيء نفسه منذ عقود. وإلى جانبها ظهر جيل أحدث وجد لغته
              الخاصة: ما زال متجذرًا في المكوّنات المحلية، لكنه أكثر عناية بالتقديم
              والمكان. هذا الدليل يغطي الاثنين، سواء كنت من أهل البلد وتبحث عن مكان
              جديد، أو زائرًا من الخليج أو من أي مكان وتريد أن تعرف وين يفطر أهل عمّان.
            </p>
          </section>

          <nav className="mt-8 rounded-2xl border border-black/8 bg-white p-5">
            <p className="mb-4 text-xs font-bold text-neutral-400">في هذا الدليل</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold text-neutral-700">فطور شعبي</p>
                <ol className="space-y-1.5 text-sm">
                  {traditional.map((p, i) => (
                    <li key={p.nameEn} className="flex items-center gap-2">
                      <span className="text-xs font-bold tabular-nums text-[#c8694a]/40">{String(i + 1).padStart(2, "0")}</span>
                      <a href={`#place-t-${i + 1}`} className="text-neutral-700 hover:text-[#c8694a] transition">{p.name}</a>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold text-neutral-700">لمسة حديثة</p>
                <ol className="space-y-1.5 text-sm">
                  {modern.map((p, i) => (
                    <li key={p.nameEn} className="flex items-center gap-2">
                      <span className="text-xs font-bold tabular-nums text-[#c8694a]/40">{String(i + 1).padStart(2, "0")}</span>
                      <a href={`#place-m-${i + 1}`} className="text-neutral-700 hover:text-[#c8694a] transition">{p.name}</a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </nav>

          <figure className="mt-8">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/amman-baklava-downtown.jpg"
                alt="صواني بقلاوة وحلويات معروضة في محل حلويات في وسط البلد في عمّان"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">صواني البقلاوة في وسط البلد: الحلو جزء من طقوس الصباح أيضًا</figcaption>
          </figure>

          <div className="mt-14">
            <div className="mb-8">
              <p className="text-xs font-bold text-[#c8694a]">الجزء الأول</p>
              <h2 className="text-2xl font-bold text-neutral-950">فطور شعبي</h2>
              <p className="mt-1 text-sm text-neutral-500">أماكن تفعل الشيء نفسه بالطريقة نفسها منذ عقود، واستحقت كل زبون دائم عندها.</p>
            </div>
            <div className="space-y-16">
              {traditional.map((place, i) => (
                <div key={place.nameEn} id={`place-t-${i + 1}`}>
                  <PlaceCard place={place} index={i} accent="t" />
                </div>
              ))}
            </div>
          </div>

          <figure className="mt-10">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/jordanian-tea-cafe-table.jpg"
                alt="كاسات شاي أردني على طاولة خشبية في مقهى مع أعشاب طازجة"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">الشاي لا يتوقف على سفرة الفطور الأردني، والصبحية لا تنتهي حتى يفرغ الإبريق</figcaption>
          </figure>

          <div className="my-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-black/8" />
            <span className="text-xs font-bold text-neutral-400">لمسة حديثة</span>
            <div className="h-px flex-1 bg-black/8" />
          </div>

          <figure className="mb-10">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/images/blog/rumman-collective-amman.jpg"
                alt="لافتة رمان كوليكتيف في شارع الرينبو مع زهور الجهنمية الوردية وإطلالة على المدينة"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">رمان كوليكتيف في شارع الرينبو، ومدخله على قدّ اسمه</figcaption>
          </figure>

          <div>
            <div className="mb-8">
              <p className="text-xs font-bold text-[#c8694a]">الجزء الثاني</p>
              <h2 className="text-2xl font-bold text-neutral-950">الفطور التقليدي بلمسة حديثة</h2>
              <p className="mt-1 text-sm text-neutral-500">أماكن تنطلق من المكوّنات المحلية وثقافة الأكل الأردنية، وتأخذها إلى مكان مدروس.</p>
            </div>
            <div className="space-y-16">
              {modern.map((place, i) => (
                <div key={place.nameEn} id={`place-m-${i + 1}`}>
                  <PlaceCard place={place} index={i} accent="m" />
                </div>
              ))}
            </div>
          </div>

          <section className="mt-16 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-neutral-950">نصائح للفطور في عمّان</h2>
            <ul className="mt-5 space-y-5 text-sm leading-7 text-neutral-700">
              {[
                ["بكّر.", "معظم الأماكن الشعبية في ذروتها بين 7 و10 صباحًا. الأفضل دائمًا هو الأبكر: الفلافل بتخلص، والحمص بأطيب حالاته."],
                ["خذ معك كاش.", "كثير من أماكن الفطور الشعبي في عمّان تقبل النقد فقط. والأسعار منخفضة؛ نادرًا ما تتجاوز بضعة دنانير للشخص لفرشة كاملة."],
                ["اطلب أكثر مما تظن أنك تحتاج.", "الفطور الأردني جماعي. الأطباق الإضافية رخيصة، والطاولة أحلى وهي مليانة."],
                ["احجز في شمس البلد.", "من أماكن الفطور القليلة في عمّان التي يستحق فيها الحجز فعلًا في عطلة نهاية الأسبوع."],
                ["امشِ بعد الفطور.", "معظم الأماكن الشعبية وعدد من الحديثة تقع في شارع الرينبو واللويبدة أو قربهما، والمشي في الحيّين بعد الفطور يكمّل الصباح."],
              ].map(([title, body]) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8694a]" />
                  <span>
                    <strong className="font-bold text-neutral-900">{title}</strong>{" "}
                    {body}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-neutral-950">ما الذي يميّز الفطور الأردني؟</h2>
            <p className="mt-4 text-sm leading-7 text-neutral-700">
              الفطور الأردني فرشة من أطباق صغيرة مشتركة، وليس صحنًا واحدًا. الأساسيات:
              حمص، فول، لبنة، فلافل، بيض حسب الطلب، زيتون، بندورة طازجة، وخبز سخن، ومعها
              زيت وزعتر على الجنب.
            </p>
            <p className="mt-4 text-sm leading-7 text-neutral-700">
              وفي عمّان تجد أيضًا الشكشوكة، قلاية الكبدة، الفتة بالخبز والحمص واللبن،
              وفطائر الجبنة والزعتر. معظم أماكن الفطور الشعبي تفتح بين 6 و8 صباحًا وتبقى
              حتى الظهر. والفطور في الأردن غالبًا أكثر وجبات اليوم اجتماعية، وأفضل مدخل
              لكرم الضيافة الأردني.
            </p>
          </section>

          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-z-orange-soft p-6 sm:p-8">
            <p className="text-xs font-bold text-[#c8694a]">جرّب شارع الرينبو بطريقة مختلفة</p>
            <h2 className="mt-2 text-xl font-bold text-neutral-950">
              اكتشف أكل عمّان مع زوّار
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              عدد من الأماكن في هذه القائمة يقع على شارع الرينبو أو قريبًا منه، وهو نفس
              الحي الذي تمر به تجربة زوّار. زوّار جولة ألغاز ذاتية في عمّان، تتوقف فيها
              عند أماكن مختارة للتذوق والاكتشاف، وتشمل أكلًا وهدايا بقيمة تزيد على 25
              دينارًا خلال نصف يوم بين شارع الرينبو واللويبدة.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/booking?lang=ar"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                احجز التجربة ←
              </Link>
              <Link
                href="/?lang=ar"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                اعرف أكثر
              </Link>
            </div>
          </section>

          <div className="mt-14 flex items-center justify-between border-t border-black/8 pt-8 text-sm text-neutral-500">
            <Link href="/blog" className="hover:text-neutral-800 transition">→ كل الأدلة</Link>
            <Link href="/blog/ar/best-restaurants-rainbow-street" className="hover:text-neutral-800 transition">أفضل مطاعم شارع الرينبو ←</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
