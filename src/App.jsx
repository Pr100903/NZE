import rawHtml from "../code.html?raw";

const bodyMatch = rawHtml.match(/<body[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/body>/i);
const bodyClasses = bodyMatch?.[1] ?? "";
const bodyContent = bodyMatch?.[2] ?? rawHtml;

const styleMatch = rawHtml.match(/<style>([\s\S]*?)<\/style>/i);
const inlineStyles = styleMatch?.[1] ?? "";

export default function App() {
  return (
    <>
      {inlineStyles ? <style dangerouslySetInnerHTML={{ __html: inlineStyles }} /> : null}
      <div
        className={bodyClasses}
        dangerouslySetInnerHTML={{ __html: bodyContent }}
      />
    </>
  );
}
