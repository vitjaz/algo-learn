"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Highlight, themes } from "prism-react-renderer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Copy } from "lucide-react";

interface CodeExampleProps {
  typescript: string;
  python: string;
}

export function CodeExample({ typescript, python }: CodeExampleProps) {
  const t = useTranslations("algorithm");
  const [copied, setCopied] = useState(false);

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-lg font-semibold">{t("codeExample")}</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCopy(typescript)}
          className="gap-1.5"
        >
          {copied ? (
            <Check className="size-3.5 text-green-500" />
          ) : (
            <Copy className="size-3.5" />
          )}
          <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>

      <div className="rounded-lg overflow-hidden">
        <Tabs className="flex-col" defaultValue="typescript">
          <TabsList className="w-full rounded-none bg-muted/50 justify-start rounded-t-lg px-4">
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
          </TabsList>
          <TabsContent value="typescript">
            <CodeBlock code={typescript} language="typescript" />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock code={python} language="python" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <Highlight theme={themes.nightOwl} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{
            ...style,
            margin: 0,
            padding: "1rem",
            overflowX: "auto",
          }}
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
  );
}
