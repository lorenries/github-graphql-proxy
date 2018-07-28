import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror-graphql/mode";
import clipboard from "clipboard";

document.addEventListener("DOMContentLoaded", function() {
  const textArea = document.querySelector("#editor");

  const doc = CodeMirror.fromTextArea(textArea, {
    mode: "graphql"
  });

  const run = document.querySelector(".run");
  const query = document.querySelector(".query");
  const copy = document.querySelector(".copy-container");

  run.addEventListener("click", e => {
    e.preventDefault();
    query.textContent = `https://github-graphql-proxy.glitch.me/api/?query=${encodeURI(
      doc.getValue()
    )}`;
  });

  new clipboard(copy);
});
