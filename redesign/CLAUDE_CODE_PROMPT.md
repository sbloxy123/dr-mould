# Prompt for Claude Code

Paste everything between the lines into Claude Code (VS Code), from the repo root, on the `redesign` branch.

---

We're rebuilding the Dr Mould website in a new design. The full brief is in `redesign/`:

- `redesign/HANDOVER.md` is the spec: design system, components, page-by-page structure, content changes, build plan and QA checklist. Read all of it first.
- `redesign/reference/*.html` are static renders of the approved pages (desktop and mobile). They're the source of truth for copy, colours, sizes and spacing. Read the inline styles for exact values.
- `redesign/screenshots/*.jpg` are the same pages as images. Look at them before building each page.
- `redesign/assets/` holds the new logo files.

How I'd like you to work:

1. Check that we're on the `redesign` branch (not `master`). If we're not, stop and tell me.
2. Read `HANDOVER.md`, the root `CLAUDE.md`, and the existing code under `app/`, `components/`, `data/` and `utils/`. Then give me a short plan that follows the phases in section 9 of `HANDOVER.md`, and wait for my OK.
3. The open questions in section 8 of `HANDOVER.md` are already answered: the phone number is 07364 233567, and the reply time is "as soon as we can". Apply them as described there. Phase 1 starts with the `.gitignore` fix.
4. Build one phase at a time. At the end of each phase:
   - run `npm run lint` and `npm run build`, and fix any problems
   - commit with a message like `redesign(phase N): …`
   - give me a short summary of what changed and anything I should check on the Vercel preview
   - then stop and wait for me before starting the next phase
5. Hard rules:
   - Don't change the enquiry backend (the API route, nodemailer, Cloudinary, environment variables), and keep the form's field names.
   - Don't change the URLs.
   - Don't upgrade Next.js, React or Tailwind.
   - Never ship bracketed placeholder text.
   - Don't commit to `master`.
6. After the last build phase, work through the QA checklist in section 10 and report the result of each item. Then do phase 9: add the pull request template, and finish your final message with the "⚠️ Before you merge" checklist.

---

## Handy follow-ups

- "Push the branch so I can check the Vercel preview."
- "Show me the diff for phase N."
- "Compare the home page at 390px with `redesign/screenshots/home-mobile-*.jpg` and list the differences."
- "The About photo is ready at `public/about.jpg`. Switch it on."
- "Add this review to `data/reviews.ts`: …"
