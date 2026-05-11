"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Highlight, themes } from "prism-react-renderer";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface CodeExampleProps {
  typescript: string;
  python: string;
}

export function CodeExample({ typescript, python }: CodeExampleProps) {
  const t = useTranslations("algorithm");
  const [activeTab, setActiveTab] = useState<"typescript" | "python">("typescript");
  const [copied, setCopied] = useState(false);

  const code = activeTab === "typescript" ? typescript : python;
  const language = activeTab === "typescript" ? "typescript" : "python";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">{t("codeExample")}</h2>
      <div className="rounded-lg border border-border overflow-hidden">
        {/* Tab header */}
        <div className="flex items-center justify-between bg-muted/50 border-b border-border">
          <div className="flex">
            <button
              onClick={() => setActiveTab("typescript")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "typescript"
                  ? "bg-background text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              TypeScript
            </button>
            <button
              onClick={() => setActiveTab("python")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "python"
                  ? "bg-background text-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Python
            </button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 h-8 w-8"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Code block — always use dark theme for code (standard practice) */}
        <Highlight
          theme={themes.nightOwl}
          code={code}
          language={language}
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={{ ...style, margin: 0, padding: "1rem", overflowX: "auto" }}
              className="text-sm"
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
