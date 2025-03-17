http://board.overcome0.be/

## 프로젝트 개요
Next.js를 메인 프레임워크로 사용하고 PostgreSQL과 Prisma로 데이터베이스를 구성한 게시판 애플리케이션입니다. 
유저 인증, RESTful API 기반 게시글, 댓글 관리, API 통신 최적화 등 풀스택 애플리케이션 개발에 필요한 전반적인 기술이 포함되어 있습니다.

## 주요 기술 스택
- **프레임워크**: Next.js 
- **데이터베이스 ORM**: Prisma (PostgreSQL 연동, 타입 안전 쿼리)
- **DB**: PostgreSQL (게시글, 유저, 댓글 데이터 관리)
- **상태관리 + API 캐싱**: TanStack Query (API 통신, 캐싱, 상태 자동 관리)
- **인증**: JWT + nookies (토큰 기반 인증 및 쿠키 관리)
- **보안**: bcrypt (비밀번호 해시화)
- **이메일**: Nodemailer (비밀번호 초기화 이메일 발송)
- **스타일링**: Tailwind CSS (빠른 UI 구성, 반응형 대응)
- **패키지 매니저**: PNPM (빠른 설치, 중복 없는 모듈 관리)

## 프로젝트 핵심 기능
### 1. 사용자 인증 시스템
- **회원가입**: bcrypt를 사용한 비밀번호 해시화 저장
- **로그인/로그아웃**: JWT 토큰 발급 및 nookies를 통한 쿠키 관리
- **세션 검증**: 모든 보호된 라우트에서 JWT 검증을 통한 사용자 인증
- **권한 관리**: 게시글, 댓글 등 리소스에 대한 소유자 권한 확인

### 2. 비밀번호 관리
- **비밀번호 초기화**: 이메일을 통한 일회용 코드 발급
- **코드 검증**: 유효한 코드 확인 후 비밀번호 재설정 허용
- **만료 시간 관리**: 비밀번호 리셋 코드의 유효 시간 설정

### 3. RESTful API 설계
- **표준 HTTP 메서드**: GET, POST, PUT, DELETE를 활용한 리소스 관리
- **응답 상태 코드**: 적절한 HTTP 상태 코드 반환
- **엔드포인트 구조**:
  - `/api/`: 인증 관련 엔드포인트
  - `/api/posts`: 게시글 관련 엔드포인트
  - `/api/comments`: 댓글 관련 엔드포인트

### 4. 데이터 관리
- **게시글 관리**: 사용자별 게시글 생성, 조회, 수정, 삭제
- **댓글 시스템**: 게시글에 대한 댓글 작성, 조회, 수정, 삭제
- **소유권 검증**: 각 리소스에 대한 작업 시 소유자 ID 검증 로직

## 설치 및 실행 방법

### 1. 프로젝트 클론
```bash
git clone https://github.com/FirstBright/front-back
cd front-back
```

### 2. 패키지 설치
```bash
pnpm install
```

### 3. 환경변수 설정
루트 디렉토리에 `.env` 파일 생성:
```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>
JWT_SECRET=your_jwt_secret_key
NAVER_PW=your_naver_password_for_api
```

### 4. Prisma 초기화 및 마이그레이션
```bash
pnpm prisma generate
pnpm prisma migrate dev --name init
```

### 5. 개발 서버 실행
```bash
pnpm dev
```

## 사용 기술과 핵심 포인트

### Prisma + PostgreSQL
- 타입 안전 데이터베이스 접근
- 관계형 데이터(글, 유저, 댓글, 비밀번호 초기화) 스키마 정의
- Prisma Studio로 데이터 확인 및 수정 가능

### TanStack Query
- API 통신 최적화 (캐싱, 리페치, 로딩/에러 핸들링 자동)
```tsx
const { data, isLoading } = useQuery(["me"], () => axios.get("/api/me"));

const logoutMutation = useMutation({
  mutationFn: async () => await axios.post("/api/logout"),
  onSuccess: () => {
    me.refetch(); // 사용자 정보 재요청 (캐시 갱신)
    window.location.reload(); // 페이지 새로고침
  },
});
```

## 주요 명령어 정리
| 명령어 | 설명 |
|-------|------|
| `pnpm install` | 패키지 설치 |
| `pnpm dev` | 개발 서버 실행 |
| `pnpm prisma generate` | Prisma 클라이언트 생성 |
| `pnpm prisma migrate dev --name <name>` | DB 마이그레이션 |
| `pnpm prisma studio` | GUI로 DB 데이터 확인 |
