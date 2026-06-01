import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFoundPage() {
  return (
    <Container className="py-20">
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-950">Page not found</h1>
        <p className="mt-4 text-zinc-600">That page is not available in this scaffold.</p>
        <div className="mt-6">
          <ButtonLink href="/">Return home</ButtonLink>
        </div>
      </div>
    </Container>
  );
}
