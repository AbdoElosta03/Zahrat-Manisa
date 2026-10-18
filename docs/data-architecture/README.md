# عقد بيانات الواجهة

هذا العقد يحدد ملكية البيانات في لوحة التحكم. أي شاشة جديدة يجب أن تلتزم به.

## المسؤوليات

| الطبقة | المسؤولية |
| --- | --- |
| Next.js App Router | المسارات وLayouts وServer Components للمحتوى الثابت وواجهة الانتظار الخاصة بالمسار. لا يجلب بيانات Python API. |
| Axios | النقل المباشر من المتصفح إلى Python REST API، وإضافة Bearer token وتحويل الأخطاء. |
| TanStack Query | المالك الوحيد لبيانات API في الواجهة: القراءة، الكاش، CRUD، الإلغاء، إعادة الجلب وPrefetch. |
| Zustand | حالة واجهة مشتركة فقط، مثل التفضيلات والنوافذ العامة. لا يخزن بيانات API أو الصلاحيات. |
| Python API | الجلسة والصلاحيات الحقيقية والتحقق من البيانات وقواعد العمل. إخفاء واجهة لا يمثل حماية. |

## مكان ملفات الـ API

عقود الاتصال وأسماء المسارات لا توضع داخل `_components`. ذلك المجلد للمكوّنات. طبقة HTTP تعيش هنا:

```text
src/lib/api/
  client.ts              Axios instance الوحيد، التوكن، mock/python
  api-error.ts
  endpoints.ts           أسماء المسارات فقط
  types/                 Zod والعقود لكل مجال
    access.ts
    bookings.ts
    flights.ts
    finance.ts
  services/              دوال Axios + تحقق Zod
    access.ts
    bookings.ts
    flights.ts
    finance.ts
```

```text
Client Component -> TanStack Query -> service (accessApi) -> endpoints -> Axios -> Python REST API
```

`_components` تعرض البيانات وتستدعي `useQuery` / `useMutation`. لا تعرف URL ولا تكتب Axios داخل JSX.

## الاتصال

`src/lib/api/client.ts` هو Axios instance الوحيد. الوضع الافتراضي هو `mock` حتى لا يتطلب المشروع عنوان API قبل جاهزيته. عند ضبط `NEXT_PUBLIC_API_MODE=python` يصبح `NEXT_PUBLIC_API_URL` مطلوبًا، ويحفظ العميل access token الذي يعيده تسجيل الدخول في `sessionStorage` ويضيفه إلى الطلبات بصيغة `Authorization: Bearer <token>`. يحذف العميل الرمز عند تسجيل الخروج أو استجابة 401. يجب أن يسمح Python بأصل الواجهة. لا تضع أي رمز أو سر في متغيرات `NEXT_PUBLIC_*`.

لا تستخدم Server Actions أو Route Handlers لجلب بيانات Query، ولا تستدع Axios من Server Component.

المسارات تُعرَّف مرة واحدة في `src/lib/api/endpoints.ts`. لا تكتب `"/users"` كنص داخل الشاشات أو الـ services.

### التطوير قبل API

اضبط `.env.local` على:

```dotenv
NEXT_PUBLIC_API_MODE=mock
```

يستخدم التطبيق حينها adapter في `src/mocks/access/adapter.ts` بعقود الاستجابات نفسها. بياناته تبقى في الذاكرة وتعود للوضع الافتراضي بعد refresh. لا يشكل fallback عند فشل Python.

عند توفر Python:

```dotenv
NEXT_PUBLIC_API_MODE=python
NEXT_PUBLIC_API_URL=https://api.example.com
```

يُستبدل adapter فقط، وتبقى queries والمكونات دون تغيير.

## Query Keys وعمليات التعديل

- توضع المفاتيح في `dashboard/_components/access/access.queries.ts` بالقرب من الشاشات التي تقرأ المجال.
- مفاتيح بيانات الوصول تبدأ بـ`["access", currentUser.id]`. هذا يمنع ظهور كاش حساب سابق بعد تبديل الحساب.
- أي فلتر أو ترتيب أو Pagination يدخل في Query Key.
- بعد mutation يجب إبطال مفاتيح المجال المتأثر فقط. تطبيق المستخدمين والأدوار يبطل `accessKeys.scope(ownerId)` وبيانات المستخدم الحالي عند الحاجة.
- لا تنسخ نتيجة `useQuery` إلى state أو Zustand.
- `queryFn` يستقبل `signal` ويمرره إلى Axios لإلغاء الطلبات البائدة.

## المستخدم الحالي والصلاحيات

`useCurrentUserQuery()` هو مصدر المستخدم الحالي الوحيد. `usePermissions()` يشتق منه `can(permission)`.

- عناصر السايدبار تعلن الصلاحية المطلوبة في `sidebar-items.ts` وتُخفى عندما لا تتوفر.
- بوابات الواجهة تمنع عرض الشاشة غير المصرح بها لتحسين التجربة فقط.
- Python يجب أن يتحقق من الصلاحية نفسها في كل endpoint.
- لا تحفظ `permissions` في Zustand أو localStorage.
- عند 401 يمسح QueryClient كاش الوصول ويعاد التوجيه إلى تسجيل الدخول.

## Loading وSkeleton وSpinner

| الحالة | الواجهة المطلوبة |
| --- | --- |
| انتقال مسار | `loading.tsx` مع Skeleton قريب من شكل الصفحة. |
| الجلب الأول لاستعلام API | Skeleton داخل مكون بيانات الشاشة. |
| إعادة الجلب مع بيانات موجودة | تبقى البيانات ويظهر Spinner صغير أو نص تحديث. |
| Pagination | `placeholderData: keepPreviousData` مع تعطيل الانتقال وإظهار التحديث. |
| Mutation | Spinner داخل الزر وتعطيل الإجراء حتى النهاية. |
| خطأ | `Alert` موضعي مع إعادة المحاولة عندما تكون ممكنة. |

لا تستخدم Skeleton عند كل `isFetching`، ولا تستخدم `loading.tsx` بدل حالة استعلام Axios داخل العميل.

## إضافة شاشة API جديدة

1. أضف المسارات في `src/lib/api/endpoints.ts`.
2. عرف schema وأنواع الاستجابة في `src/lib/api/types/<domain>.ts`.
3. أضف دوال Axios في `src/lib/api/services/<domain>.ts` والتحقق عبر Zod.
4. عرف query keys و`queryOptions` بجانب الشاشة في `*.queries.ts`.
5. ضع المكونات التفاعلية داخل `_components` مع `useQuery` أو `useMutation`.
6. أضف Skeleton وError state وSpinner للعمليات.
7. اعلن صلاحية route وعنصر التنقل، وتحقق منها داخل Python.
8. أضف Prefetch فقط لتفاعل متوقع، مثل التفاصيل عند hover أو الصفحة التالية.

## قواعد ممنوعة

- لا Axios مباشرة داخل JSX أو event handler خارج ملف `services`.
- لا مسارات API كنصوص خارج `endpoints.ts`.
- لا عقود API أو دوال اتصال داخل `_components`.
- لا بيانات API في Zustand أو `localStorage`.
- لا `useEffect` لجلب بيانات API.
- لا Server Action داخل `queryFn`.
- لا اعتماد على إخفاء الزر أو المسار كحماية أمنية.
