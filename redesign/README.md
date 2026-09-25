# Redesign: setup, versioning and going live

This is the step-by-step for Stuart. The detailed build brief for Claude Code is in `HANDOVER.md`.

## 1. Keep the original site safe, then branch

In VS Code's terminal, from the repo root:

```bash
# make sure you're up to date on the live branch
git checkout master
git pull

# 1) permanent bookmark of the current live site
git tag -a v1-original -m "Original Dr Mould site before the 2026 redesign"
git push origin v1-original

# 2) optional: a branch copy too (easier to browse on GitHub)
git branch legacy-v1 v1-original
git push origin legacy-v1

# 3) the branch all redesign work happens on
git checkout -b redesign
```

Next, copy this `redesign/` folder into the repo root. That gives you `dr-mould/redesign/HANDOVER.md` and so on. Then commit it:

```bash
git add redesign
git commit -m "Add redesign handover pack"
git push -u origin redesign
```

What each piece gives you:

- **`master`** stays exactly as it is now. The live site at dr-mould.co.uk keeps deploying from it.
- **`v1-original`** is a permanent snapshot of the old site. You can always get back to it with `git checkout v1-original`, or view it on GitHub under *Tags*.
- **`redesign`** is where Claude Code works.

## 2. Preview on Vercel before anything goes live

Vercel builds every pushed branch as a **Preview deployment**, with its own URL. You'll find it on the Vercel dashboard under the project's *Deployments*, or on the GitHub branch or pull request. The live domain isn't affected.

**Before you test the enquiry form on a preview:** in Vercel go to *Project → Settings → Environment Variables* and make sure the following are enabled for the **Preview** environment, not just Production. Otherwise the form and photo uploads will fail on the preview.

- `GOOGLE_EMAIL`
- `GOOGLE_PASSWORD`
- the four `CLOUDINARY_*` / `NEXT_PUBLIC_CLOUDINARY_*` variables

## 3. Start Claude Code

Open the repo in VS Code on the `redesign` branch, start Claude Code, and paste the prompt in `CLAUDE_CODE_PROMPT.md`. Claude Code will work in phases, commit after each one and pause, so you can check each phase on the preview URL.

Push after each phase (or ask Claude Code to) so the preview updates: `git push`

## 4. Go live

When you're happy with the preview:

1. On GitHub, open a **Pull Request** from `redesign` into `master`, and check the Vercel preview link on it one last time.
2. **Merge.** Vercel deploys `master` to dr-mould.co.uk automatically.
3. Check the live site: the pages, the form (send yourself a test), and the phone links on a real phone.

## 5. If you need to roll back

- **Fastest:** in Vercel go to *Deployments*, find the last deployment from before the merge, open its **⋯** menu and choose **Promote to Production** (or *Instant Rollback*). The old site is back in seconds, with no code changes.
- **Undo the merge in Git:** `git checkout master && git revert -m 1 <merge-commit-sha> && git push`
- **Just look at or restore old files:** `git checkout v1-original -- path/to/file`

## 6. Housekeeping

- Once the redesign is live and stable, you can delete the `redesign` branch. Keep the `v1-original` tag forever.
- If you like, delete the `redesign/` folder in a final commit after launch (it's also preserved in Git history), or keep it as documentation.
