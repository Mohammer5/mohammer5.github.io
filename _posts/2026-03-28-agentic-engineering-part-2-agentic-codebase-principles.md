---
layout: post
title: "What are the characteristics of a mainainable (agentic) codebase?"
header_kicker: "Howto successful Agentic Engineering - Part 2"
date: 2026-03-28
tags: []
---

> *"Everything in software architecture is a trade-off. [...] If an architect thinks they have discovered something that isn’t a trade-off, more likely they just haven’t yet identified the trade-off."*
>
> [DevIQ - Laws of Software Architecture](https://deviq.com/laws/laws-software-architecture/)

## Introduction

With AI writing much larger volumes of code much faster, defects can now propagate through a codebase at a pace that used to require an entire team. The core problem is not that coding agents are incapable; it is that they do not hold the whole system in working memory at once, so they need legible structure, reliable constraints, and feedback loops that let them verify their own work. [[6]](#ref-6) [[7]](#ref-7) [[16]](#ref-16) [[20]](#ref-20)

That shifts the engineering problem. Instead of asking only whether humans can maintain the system, we also have to ask whether an unfamiliar agent can explore it, form a correct local model, make a narrow change, and validate that change without disturbing unrelated parts of the application. OpenAI describes this as increasing “application legibility,” while Anthropic emphasizes progressive disclosure: the agent should discover relevant context incrementally rather than drown in a giant undifferentiated prompt. [[6]](#ref-6) [[7]](#ref-7)

> “Give Codex a map, not a 1,000-page instruction manual.” — OpenAI

The approaches below are not the only way to achieve a maintainable codebase. The point is to compare design choices by the way they affect a few underlying characteristics that matter for both humans and agents.

## Characteristics that matter

There is no architecture without trade-offs, and those trade-offs are not purely technical. Different teams will tolerate different levels of duplication, indirection, centralization, or coordination overhead. The useful question is not “what style is right?” but “how does a given style improve or degrade the following properties?”

### Locality

Locality describes how many places need to be touched to complete a concrete task. In a healthy codebase, most changes stay narrow and do not require edits across unrelated modules. Parnas’s classic formulation is still the right mental model: modules should be organized around decisions likely to change, and those decisions should be hidden from the rest of the system. [[1]](#ref-1)

> “Each module is then designed to hide such a decision from the others.” — Parnas

That matters even more for agentic engineering. If a feature is scattered across shared helpers, orchestration layers, utility packages, and cross-cutting side effects, the agent must keep more of the system in context and is more likely to miss one dependency or “fix” the wrong abstraction. By contrast, when code is aligned with cohesive business capabilities, many single-service or single-slice changes can remain local to that area. [[4]](#ref-4) [[5]](#ref-5) [[6]](#ref-6)

A practical consequence is that locality is not just about folder layout. It depends on whether the ownership boundary, the semantic boundary, and the build-and-test boundary line up well enough that the smallest sensible unit of work is also the smallest sensible unit of change. [[3]](#ref-3) [[5]](#ref-5)

### Blast radius

Blast radius is the size of the unintended side effects of a change. A small blast radius means a change remains local; a large one makes refactorings and fast iteration much riskier than they should be. Protected Variation is a useful lens here: likely points of change should sit behind stable interfaces so that clients are not forced to move with every implementation decision. [[2]](#ref-2)

> “Identify points of predicted variation and create a stable interface around them.” — Larman

For agents, blast radius is partly an architectural issue and partly a workflow issue. The architecture determines how far a change can leak; the harness determines how much the agent is allowed to touch before it proves safety. OpenAI’s agent-first repo uses mechanically enforced dependency rules, while recent agent-harness work recommends filtered tools, isolated worktrees, and explicit progress checkpoints so the system can recover from bad turns instead of amplifying them. [[6]](#ref-6) [[8]](#ref-8) [[19]](#ref-19)

This is also why migration patterns such as branch by abstraction or legacy displacement matter in an agentic setting: they create seams that allow large changes to proceed gradually instead of forcing a broad, one-shot rewrite. [[14]](#ref-14) [[15]](#ref-15)

### Boundary integrity

Boundary integrity is about how clear the borders are between modules, components, or services. Good boundaries rely on explicit interfaces and clearly separated responsibilities, while heavy coupling usually signals structural weakness. Fowler’s bounded-context framing is especially useful here: large systems rarely support one perfectly unified model, so the healthier move is to define local models and the translations between them explicitly. [[3]](#ref-3)

> “Strict boundaries and predictable structure.” — OpenAI

That principle becomes more important with agents because agents reason from partial observations. If one module reaches directly into another team’s tables, state, or side effects, the agent may infer the wrong contract from local evidence. Mechanically enforced layer rules, explicit provider interfaces, and dependency-direction checks reduce that ambiguity and make the architecture legible in a way prompts alone cannot. [[6]](#ref-6) [[20]](#ref-20)

Boundary integrity also improves failure handling. When responsibilities are explicit, verification can target the contract at the boundary rather than revalidating an entire downstream chain of accidental couplings. [[2]](#ref-2) [[4]](#ref-4)

### Navigability

Navigability is the speed with which a new person can orient themselves in the codebase. This is especially important for AI agents, because they can only inspect a small part of the system at a time. Anthropic describes the ideal as progressive disclosure: the agent should be able to retrieve just enough context for the next decision, then refine its mental model as exploration continues. [[7]](#ref-7)

> “Agents can assemble understanding layer by layer.” — Anthropic

That makes searchability and repository-local knowledge first-class engineering concerns. OpenAI argues for treating a short `AGENTS.md` as a table of contents rather than an encyclopedia, while Google’s engineering guidance stresses both code search and documentation designed to help unfamiliar contributors get something real running quickly. [[6]](#ref-6) [[9]](#ref-9) [[11]](#ref-11)

Recent work on code agents also suggests that architecture understanding itself is an active-exploration problem. Agents build beliefs from partial observations, revise them as the environment changes, and then exploit those beliefs to perform downstream tasks. In practice, that means good navigability is less about clever naming alone and more about giving the repo enough maps, conventions, and discoverable entry points that those beliefs converge quickly and correctly. [[18]](#ref-18) [[20]](#ref-20)

### Rebuild/test scope

Rebuild and test scope determine how narrowly a change can be verified. The better the structure, the more often only the affected parts need to be built or tested, which keeps feedback fast and iteration practical. Google’s testing guidance is blunt: larger system-scale tests were often slower, less reliable, and harder to debug than smaller tests. [[10]](#ref-10)

> “Slower, less reliable, and more difficult to debug than smaller tests.” — Software Engineering at Google

For agentic engineering, narrow verification is not a convenience; it is the difference between an agent being able to self-correct within its loop and needing a human to arbitrate every change. Fowler’s recommendation to shift validation left applies directly here: agents produce better code when they can gauge quality themselves. [[16]](#ref-16) [[17]](#ref-17)

That requires both architectural seams and tooling seams. Hermetic builds make local validation trustworthy by isolating the build from the host machine; test-impact analysis narrows execution to the subset of tests relevant to the change; and evaluation loops let teams check outputs against unit tests, latency targets, or style rules without broad manual review. [[12]](#ref-12) [[13]](#ref-13) [[17]](#ref-17)

## How to ensure these characteristics

The following approaches are useful not because they are fashionable, but because they improve one or more of the characteristics above. Each one also carries real costs, so the goal is not ideological purity but better trade-offs.

### Vertical slices architecture

Vertical slices architecture organizes code around concrete user-facing capabilities instead of technical layers alone. The goal is that a feature can be understood, changed, and verified mostly within its own slice, without having to coordinate across half the system. This works especially well when each slice reflects a business capability or bounded context rather than an arbitrary UI path. [[3]](#ref-3) [[4]](#ref-4)

For agentic engineering, vertical slices also reduce exploration cost. A slice gives the agent a smaller semantic search space, clearer ownership, and a more obvious test surface. That improves locality and navigability at the same time. [[5]](#ref-5) [[6]](#ref-6)

The trade-offs are real. Shared technical concerns can become harder to standardize, and implementing features that span slices or services can require more coordination. Richardson explicitly notes that finer-grained decomposition improves maintainability and deployability, but also adds complexity. [[5]](#ref-5)

### Coupling & Cohesion

Coupling and cohesion describe whether code that belongs together actually lives together, and whether unrelated things are kept apart. High cohesion means a module has a clear purpose; low coupling means that purpose does not depend on hidden knowledge spread across the rest of the codebase. Parnas’s and Larman’s arguments point in the same direction: hide volatile design decisions and protect clients from expected variation. [[1]](#ref-1) [[2]](#ref-2)

In an agentic repo, this has a second-order effect on context quality. Cohesive modules make retrieval cleaner because the files an agent opens are more likely to belong to the same concern; loosely coupled modules make the agent’s inferred contract more stable because fewer unrelated files silently participate in the behavior. [[6]](#ref-6) [[7]](#ref-7)

The trade-off is that stronger interfaces can increase friction at boundaries. A team that aggressively decomposes everything may gain cleaner contracts but lose flow through excess coordination.

### Avoiding unnecessary complexity

Avoiding unnecessary complexity means resisting abstractions, indirections, and generalizations that do not solve a current problem. Complexity is not only a readability issue; it expands the amount of context required to make safe changes. OpenAI’s experience with agent-first development makes this very concrete: a giant manual, a sprawling abstraction layer, or a maze of special cases all crowd out the relevant signal. [[6]](#ref-6) [[7]](#ref-7)

> “You must pick your battles in design.” — Larman

That does not mean “never abstract.” It means introducing indirection where it protects meaningful variation, not where it merely advertises cleverness. If the abstraction does not reduce the cost of future change, it often raises the cost of navigation, testing, and debugging instead. [[2]](#ref-2)

### Docs-driven Agentic Engineering (DEA)

Docs-driven Agentic Engineering (DEA) means making semantics, boundaries, workflows, and decision-relevant context explicit in durable documentation before they are scattered across code, chat history, and individual assumptions. In practice, that gives both humans and agents a stable source of truth instead of forcing them to reconstruct intent from partial implementation details. [[6]](#ref-6) [[9]](#ref-9)

> “Documentation is often so tightly coupled to code that it should… be treated as code.” — Software Engineering at Google

This section benefits from a stronger claim than the draft currently makes: docs are not only explanatory artifacts, they are navigation and control surfaces for agents. OpenAI uses repository knowledge as the system of record; Cognition recommends adding repo-specific knowledge and playbooks; and Google’s documentation chapter argues for ownership, review, source control, and freshness checks. [[6]](#ref-6) [[9]](#ref-9) [[18]](#ref-18)

The trade-off is maintenance overhead. Stale documentation can produce false confidence faster than no documentation at all. The antidote is to keep docs close to code, review them with code changes, and make key architecture and workflow documents measurable for freshness or verification status. [[6]](#ref-6) [[9]](#ref-9)

### BDD

BDD, in the broad sense, means describing behavior from the perspective of observable outcomes rather than internal implementation first. It pushes teams to define what the system should do in concrete scenarios before they get lost in technical details. That matters for agents because evaluation loops only work well when the expected behavior is stated in a form the agent can verify. [[16]](#ref-16) [[17]](#ref-17)

The draft currently connects BDD to boundary integrity and rebuild scope, which is right, but there is another benefit worth naming: behavior-first examples reduce prompt ambiguity. Instead of telling an agent to “fix pricing,” you can point it to concrete scenarios, acceptance checks, or contract tests that define success without over-specifying the implementation. [[10]](#ref-10) [[17]](#ref-17)

The trade-off is ceremony. When scenarios become rote documentation rather than decision-making tools, they add maintenance cost without improving feedback.

### Avoiding premature generalization

Avoiding premature generalization means refusing to introduce shared abstractions, flexible configuration layers, or generic building blocks before there is enough evidence that the behavior is truly shared. It is usually cheaper to extract later than to maintain the wrong abstraction too early. [[1]](#ref-1) [[2]](#ref-2)

This matters disproportionately in agentic codebases because speculative abstractions expand the search space. An agent confronted with a premature “platform” layer has to infer whether the true behavior lives in the feature code, the generic framework, the configuration surface, or all three. [[6]](#ref-6) [[7]](#ref-7)

When extraction is actually needed, patterns such as branch by abstraction let teams move toward a shared seam gradually instead of forcing a big-bang migration. [[14]](#ref-14)

### Avoiding premature optimization

Avoiding premature optimization means not distorting the structure of the system around performance concerns that are not yet real constraints. Once optimization becomes the driver too early, the codebase often becomes harder to understand, change, and verify long before the performance gain is actually needed. For agents, this usually manifests as extra caches, specialized execution paths, and implicit invariants that are poorly documented and hard to validate locally. [[16]](#ref-16) [[17]](#ref-17)

That does not rule out performance-first design for real hot paths. It means that performance work should be driven by measured constraints and reinforced by explicit tests or budgets, not by speculative complexity. Evaluation loops against latency targets are a better fit for agents than architecture distorted in advance around imagined bottlenecks. [[17]](#ref-17)

## Conclusion

A maintainable agentic codebase is not one with the most abstractions or the most documents. It is one where change can stay local, side effects remain contained, boundaries are explicit, the structure is navigable, and verification is narrow enough to fit inside the agent’s own loop. Those properties are valuable for humans too; agents simply make the cost of neglecting them visible much sooner. [[6]](#ref-6) [[7]](#ref-7) [[16]](#ref-16)

## References

<a id="ref-1"></a>
[1] [D. L. Parnas, “On the Criteria To Be Used in Decomposing Systems into Modules,” 1971.](https://prl.khoury.northeastern.edu/img/p-tr-1971.pdf)

<a id="ref-2"></a>
[2] [Craig Larman, “Protected Variation: The Importance of Being Closed,” IEEE Software, 2001.](https://www.martinfowler.com/ieeeSoftware/protectedVariation.pdf)

<a id="ref-3"></a>
[3] [Martin Fowler, “Bounded Context.”](https://martinfowler.com/bliki/BoundedContext.html)

<a id="ref-4"></a>
[4] [Martin Fowler and James Lewis, “Microservices.”](https://martinfowler.com/articles/microservices.html)

<a id="ref-5"></a>
[5] [Chris Richardson, “Service per team.”](https://microservices.io/patterns/decomposition/service-per-team.html)

<a id="ref-6"></a>
[6] [OpenAI, “Harness engineering: leveraging Codex in an agent-first world.”](https://openai.com/index/harness-engineering/)

<a id="ref-7"></a>
[7] [Anthropic, “Effective context engineering for AI agents.”](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

<a id="ref-8"></a>
[8] [Anthropic, “Effective harnesses for long-running agents.”](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

<a id="ref-9"></a>
[9] [Software Engineering at Google, Chapter 10: Documentation.](https://abseil.io/resources/swe-book/html/ch10.html)

<a id="ref-10"></a>
[10] [Software Engineering at Google, Chapter 11: Testing Overview.](https://abseil.io/resources/swe-book/html/ch11.html)

<a id="ref-11"></a>
[11] [Software Engineering at Google, Chapter 17: Code Search.](https://abseil.io/resources/swe-book/html/ch17.html)

<a id="ref-12"></a>
[12] [Bazel, “Hermeticity.”](https://bazel.build/basics/hermeticity)

<a id="ref-13"></a>
[13] [Microsoft Learn, “Use Test Impact Analysis.”](https://learn.microsoft.com/en-us/azure/devops/pipelines/test/test-impact-analysis?view=azure-devops)

<a id="ref-14"></a>
[14] [Martin Fowler, “Branch By Abstraction.”](https://martinfowler.com/bliki/BranchByAbstraction.html)

<a id="ref-15"></a>
[15] [Martin Fowler, “Patterns of Legacy Displacement.”](https://martinfowler.com/articles/patterns-legacy-displacement/)

<a id="ref-16"></a>
[16] [Martin Fowler, “Humans and Agents in Software Engineering Loops.”](https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html)

<a id="ref-17"></a>
[17] [OpenAI Developers, “Building an AI-Native Engineering Team.”](https://developers.openai.com/codex/guides/build-ai-native-engineering-team/)

<a id="ref-18"></a>
[18] [Cognition, “How Cognition Uses Devin to Build Devin.”](https://cognition.ai/blog/how-cognition-uses-devin-to-build-devin)

<a id="ref-19"></a>
[19] [“Building Effective AI Coding Agents for the Terminal.”](https://arxiv.org/html/2603.05344v2)

<a id="ref-20"></a>
[20] [“Theory of Code Space: Do Code Agents Understand Software Architecture?”](https://arxiv.org/html/2603.00601v4)
