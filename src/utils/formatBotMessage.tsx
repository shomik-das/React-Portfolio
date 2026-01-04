import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { preprocessLinks } from "./preprocessLinks";

export function formatMarkdownMessage(text: string) {
    const safeText = preprocessLinks(text);

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                p: ({ children }) => (
                    <p className="mb-2 leading-relaxed text-left text-white">{children}</p>
                ),
                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline hover:text-blue-300"
                    >
                        {children}
                    </a>
                ),
                li: ({ children }) => (
                    <li className="ml-5 list-disc text-white">{children}</li>
                ),
                ul: ({ children }) => (
                    <ul className="mb-2 space-y-1">{children}</ul>
                )
            }}
        >
            {safeText}
        </ReactMarkdown>
    );
}
