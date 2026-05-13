# 🧠 Algo Learn

**Algo Learn** is an interactive platform for learning algorithms and data structures through visual step-by-step animations.

🌐 [Читать на русском](./README.md)

---

## 💡 About

Understanding algorithms is a crucial skill for any developer, but learning them from textbooks is often dry and ineffective. **Algo Learn** turns algorithm study into an interactive experience — you watch the algorithm work step by step, right in your browser.

### Features

- 🔍 **Binary Search** — step-by-step visualization of array bisection
- 🫧 **Bubble Sort** — animated pairwise comparison and element swapping
- 🔀 **Merge Sort** — visualization of the divide-and-conquer approach
- ⚡ **Quick Sort** — animated pivot selection and partitioning
- 🌙 Dark and light theme support
- 🌍 Bilingual interface (Russian / English)
- 📱 Responsive design for mobile devices

### Implemented Algorithms

| Algorithm     | Category | Best     | Average  | Worst    | Space   |
| ------------- | -------- | -------- | -------- | -------- | ------- |
| Binary Search | Search   | O(1)     | O(logn)  | O(logn)  | O(1)    |
| Bubble Sort   | Sorting  | O(n)     | O(n²)    | O(n²)    | O(1)    |
| Merge Sort    | Sorting  | O(nlogn) | O(nlogn) | O(nlogn) | O(n)    |
| Quick Sort    | Sorting  | O(nlogn) | O(nlogn) | O(n²)    | O(logn) |

---

## 🛠 Tech Stack

- **[Next.js 16](https://nextjs.org)** — React framework with server-side rendering
- **[React 19](https://react.dev)** — UI library
- **[Tailwind CSS 4](https://tailwindcss.com)** — utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** — UI components
- **[Framer Motion](https://motion.dev)** — animations
- **[next-intl](https://next-intl.dev)** — internationalization
- **[prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer)** — syntax highlighting
- **[Docker](https://docker.com)** — containerization and deployment

---

## 🚀 Getting Started

### Option 1: Node.js (development)

#### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended) or npm/yarn

#### Installation

```bash
# Clone the repository
git clone https://github.com/vitjaz/algo-learn.git
cd algo-learn

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Docker (production)

#### Prerequisites

- **Docker** with Docker Compose support

#### Run

```bash
# Clone the repository
git clone https://github.com/vitjaz/algo-learn.git
cd algo-learn

# Build and start the container
docker compose up -d --build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Useful commands

```bash
docker compose logs -f       # Logs
docker compose down           # Stop
docker compose up -d --build  # Rebuild and start
```

---

## 👤 Author

**Vitaly Alexeev**

- Telegram: [@alexeev_dev_blog](https://t.me/alexeev_dev_blog)
- GitHub: [vitjaz](https://github.com/vitjaz)

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
