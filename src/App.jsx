import { useState } from "react";

const QUESTIONS = [
  {
    id: "q1", section: "About You",
    type: "single",
    question: "How would you describe yourself?",
    options: ["Home cook (cook regularly)", "Occasional cook (weekends/special occasions)", "Beginner (still learning)", "I don't cook much, but I love food"]
  },
  {
    id: "q2", section: "About You",
    type: "single",
    question: "Do you have family recipes that have been passed down to you?",
    options: ["Yes — many!", "Yes — a few", "Some, but most are lost", "No, not really"]
  },
  {
    id: "q3", section: "About You",
    type: "single",
    question: "Have you ever worried about losing a family recipe forever?",
    options: ["Yes, it's already happened", "Yes, I think about it often", "Occasionally", "Not really"]
  },
  {
    id: "q4", section: "Current Habits",
    type: "single",
    question: "How do you currently store your family recipes?",
    options: ["In my head / memory", "Handwritten cards or notebooks", "A recipe app", "Screenshots / photos on my phone", "I don't store them"]
  },
  {
    id: "q5", section: "Current Habits",
    type: "multi",
    question: "Which of these frustrate you about existing recipe apps? (Select all that apply)",
    options: ["They're too expensive", "No real collaboration with family", "Can't add the story behind a recipe", "No cultural heritage options", "Lose data when you cancel subscription", "Too focused on trending food, not tradition"]
  },
  {
    id: "q6", section: "About the App",
    type: "single",
    question: "How interested are you in an app that lets your whole family build a shared digital cookbook together?",
    options: ["Very interested — I'd use it immediately", "Interested — I'd try it", "Somewhat interested", "Not really my thing"]
  },
  {
    id: "q7", section: "About the App",
    type: "multi",
    question: "Which features excite you most? (Select all that apply)",
    options: [
      "📜 Saving the story behind each recipe",
      "🌳 Recipe family tree (who cooked it, when, how it evolved)",
      "📷 Scanning handwritten recipe cards with AI",
      "🧠 Ingredient matcher (what can I cook with what I have?)",
      "📖 Printing a physical family cookbook",
      "🌍 Cultural heritage tags (Cape Malay, Afrikaner, Zulu, etc.)",
      "👨‍👩‍👧 Inviting family to collaborate",
      "🌟 Meal of the Week suggestions"
    ]
  },
  {
    id: "q8", section: "About the App",
    type: "single",
    question: "Would you pay for a printed physical copy of your family cookbook?",
    options: ["Yes — as a gift, absolutely", "Yes — for myself", "Maybe, depending on the price", "No, I'd only want the digital version"]
  },
  {
    id: "q9", section: "About the App",
    type: "single",
    question: "What price feels fair for a premium printed family cookbook (A5, ~50 recipes)?",
    options: ["R150 – R250", "R250 – R400", "R400 – R600", "I wouldn't pay for a printed copy"]
  },
  {
    id: "q10", section: "About the App",
    type: "single",
    question: "The core app would be completely free for families. How does that affect your interest?",
    options: ["Makes me much more likely to use it", "It's a nice bonus", "I'd pay if it was good enough anyway", "Doesn't change my interest"]
  },
  {
    id: "q11", section: "Final Thoughts",
    type: "single",
    question: "How likely are you to recommend this app to a family member?",
    options: ["Very likely", "Likely", "Unsure", "Unlikely"]
  },
  {
    id: "q12", section: "Final Thoughts",
    type: "text",
    question: "Is there a feature or idea you'd love to see that we haven't mentioned?",
    placeholder: "e.g. Voice recordings of grandma telling the recipe, WhatsApp sharing, Afrikaans language support..."
  },
  {
    id: "q13", section: "Final Thoughts",
    type: "text",
    question: "Any other thoughts, suggestions, or family recipe memories you'd like to share?",
    placeholder: "We'd love to hear your story..."
  },
  {
    id: "q14", section: "Stay in the Loop",
    type: "text",
    question: "Would you like to be notified when the app launches? Drop your email or WhatsApp number (optional):",
    placeholder: "email@example.com or 082 000 0000"
  },
];

const SECTIONS = [...new Set(QUESTIONS.map(q => q.section))];
const GRAD = "linear-gradient(135deg,#f97316,#ef4444)";

export default function App() {
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const q = QUESTIONS[current];
  const total = QUESTIONS.length;
  const progress = (current / total) * 100;
  const section = q?.section;
  const sectionIdx = SECTIONS.indexOf(section);
  const answer = answers[q?.id];
  const sectionColors = ["#f97316", "#a855f7", "#0ea5e9", "#22c55e"];

  const setAnswer = (val) => setAnswers(p => ({ ...p, [q.id]: val }));
  const toggleMulti = (opt) => {
    const cur = answers[q.id] || [];
    setAnswer(cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt]);
  };
  const canNext = () => {
    if (!q) return false;
    if (q.type === "text") return true;
    if (q.type === "single") return !!answers[q.id];
    if (q.type === "multi") return (answers[q.id] || []).length > 0;
    return false;
  };
  const next = () => { if (current < total - 1) setCurrent(c => c + 1); else setSubmitted(true); };
  const prev = () => { if (current > 0) setCurrent(c => c - 1); };

  if (submitted) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#fff7ed,#fef3c7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "system-ui,sans-serif" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        <div style={{ background: "#fff", borderRadius: 28, padding: "40px 32px", boxShadow: "0 8px 40px rgba(0,0,0,.1)" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🍽️</div>
          <div style={{ fontWeight: 900, fontSize: 26, color: "#1a1a1a", marginBottom: 8 }}>Thank you!</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#f97316", marginBottom: 12 }}>Your response has been recorded.</div>
          <div style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
            Your input helps shape <strong>Generations of Flavor: A McKnight to Remember</strong> into something truly special for families across South Africa and beyond.
          </div>
          <div style={{ background: "linear-gradient(135deg,#fff7ed,#fffbeb)", border: "1px solid #fed7aa", borderRadius: 16, padding: "16px 20px", marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: "#92400e", fontStyle: "italic", lineHeight: 1.7 }}>
              "73% of family recipes are lost within one generation. You're helping us change that."
            </div>
          </div>
          <div style={{ fontSize: 13, color: "#aaa" }}>Share this survey with your family 👇</div>
          <button onClick={() => { setSubmitted(false); setAnswers({}); setCurrent(0); }}
            style={{ marginTop: 20, background: GRAD, color: "#fff", border: "none", borderRadius: 99, padding: "12px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
            Submit Another Response
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#fff7ed,#fef3c7)", padding: "20px 16px", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 36, marginBottom: 6 }}>🌿</div>
          <div style={{ fontWeight: 900, fontSize: 22, color: "#1a1a1a", lineHeight: 1.2 }}>Generations of Flavor</div>
          <div style={{ fontWeight: 600, fontSize: 13, color: "#f97316", fontStyle: "italic" }}>A McKnight to Remember — App Survey</div>
          <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>Help us build something your family will treasure forever</div>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 16, justifyContent: "center" }}>
          {SECTIONS.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: i <= sectionIdx ? sectionColors[i] : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: i <= sectionIdx ? "#fff" : "#aaa", transition: "all .3s" }}>{i + 1}</div>
              {i < SECTIONS.length - 1 && <div style={{ width: 18, height: 2, background: i < sectionIdx ? sectionColors[i] : "#e5e7eb", borderRadius: 2, transition: "all .3s" }} />}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: sectionColors[sectionIdx], marginBottom: 16, letterSpacing: 1.5 }}>
          {section?.toUpperCase()} · Question {current + 1} of {total}
        </div>

        <div style={{ height: 6, background: "#e5e7eb", borderRadius: 99, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: GRAD, borderRadius: 99, transition: "width .4s ease" }} />
        </div>

        <div style={{ background: "#fff", borderRadius: 24, padding: "28px 24px", boxShadow: "0 4px 24px rgba(0,0,0,.08)", marginBottom: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 17, color: "#1a1a1a", lineHeight: 1.5, marginBottom: 20 }}>
            {q.question}
            {q.type === "multi" && <span style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#aaa", marginTop: 4 }}>Select all that apply</span>}
            {q.type === "text" && q.id === "q14" && <span style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#aaa", marginTop: 4 }}>Optional — only if you'd like to hear from us</span>}
          </div>

          {q.type === "single" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.options.map(opt => {
                const sel = answer === opt;
                return (
                  <button key={opt} onClick={() => setAnswer(opt)}
                    style={{ textAlign: "left", padding: "13px 16px", borderRadius: 14, border: `2px solid ${sel ? "#f97316" : "#e5e7eb"}`, background: sel ? "#fff7ed" : "#fafafa", cursor: "pointer", fontWeight: sel ? 700 : 500, fontSize: 14, color: sel ? "#ea580c" : "#444", transition: "all .2s", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${sel ? "#f97316" : "#d1d5db"}`, background: sel ? "#f97316" : "#fff", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {sel && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                    </div>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {q.type === "multi" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.options.map(opt => {
                const sel = (answer || []).includes(opt);
                return (
                  <button key={opt} onClick={() => toggleMulti(opt)}
                    style={{ textAlign: "left", padding: "13px 16px", borderRadius: 14, border: `2px solid ${sel ? "#f97316" : "#e5e7eb"}`, background: sel ? "#fff7ed" : "#fafafa", cursor: "pointer", fontWeight: sel ? 700 : 500, fontSize: 14, color: sel ? "#ea580c" : "#444", transition: "all .2s", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${sel ? "#f97316" : "#d1d5db"}`, background: sel ? "#f97316" : "#fff", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 900 }}>
                      {sel && "✓"}
                    </div>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {q.type === "text" && (
            <textarea value={answer || ""} onChange={e => setAnswer(e.target.value)}
              placeholder={q.placeholder}
              style={{ width: "100%", minHeight: 110, border: "2px solid #e5e7eb", borderRadius: 14, padding: "12px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box", color: "#444", lineHeight: 1.6 }}
              onFocus={e => e.target.style.borderColor = "#f97316"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
          )}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {current > 0 && (
            <button onClick={prev} style={{ padding: "13px 20px", background: "#fff", border: "2px solid #e5e7eb", borderRadius: 99, fontWeight: 700, fontSize: 14, cursor: "pointer", color: "#888" }}>← Back</button>
          )}
          <button onClick={next} disabled={!canNext()}
            style={{ flex: 1, padding: "14px", background: canNext() ? GRAD : "#e5e7eb", color: canNext() ? "#fff" : "#aaa", border: "none", borderRadius: 99, fontWeight: 900, fontSize: 15, cursor: canNext() ? "pointer" : "not-allowed", transition: "all .2s" }}>
            {current === total - 1 ? "Submit Response 🍽️" : q.type === "text" && !answer ? "Skip →" : "Next →"}
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#bbb" }}>
          Your responses are anonymous · Takes ~3 minutes
        </div>
      </div>
    </div>
  );
}