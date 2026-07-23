export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-12 text-sm leading-7">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p>
        <strong>Last updated:</strong> July 23, 2026
      </p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Introduction</h2>

        <p>
          This Privacy Policy explains how <strong>danibura.me</strong> ("we",
          "us", "our", or the "Service") collects, uses, stores, and protects
          users' personal information when they use our personal finance
          management platform.
        </p>

        <p>
          The Service allows users to track their income and expenses, organize
          financial transactions, and optionally connect their bank accounts
          through Open Banking services to automatically import transaction
          data.
        </p>

        <p>
          By using the Service, you agree to the practices described in this
          Privacy Policy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. Data Controller</h2>

        <p>
          The data controller responsible for processing your personal
          information is:
        </p>

        <p>
          <strong>danibura.me</strong>
        </p>

        <p>
          Contact email:
          <br />
          <strong>danibura2007@gmail.com</strong>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. Personal Data We Collect</h2>

        <h3 className="font-semibold">3.1 Information provided by the user</h3>

        <p>When creating an account, we may collect:</p>

        <ul className="list-disc space-y-1 pl-6">
          <li>Email address;</li>
          <li>Name and surname, if provided;</li>
          <li>Account credentials;</li>
          <li>Account preferences;</li>
          <li>
            Manually entered financial information, such as transactions and
            categories.
          </li>
        </ul>

        <p>
          Passwords are not stored in plain text and are processed using secure
          authentication mechanisms.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-semibold">3.2 Financial Data from Open Banking</h3>

        <p>
          If you choose to connect a bank account, we may receive financial
          information through our Open Banking provider:
        </p>

        <p>
          <strong>Plaid Inc.</strong>
        </p>

        <p>The information may include:</p>

        <ul className="list-disc space-y-1 pl-6">
          <li>Transaction details;</li>
          <li>Transaction amounts;</li>
          <li>Transaction dates;</li>
          <li>Merchant information;</li>
          <li>Transaction categories;</li>
          <li>Account information necessary to provide the Service.</li>
        </ul>

        <p>We do not collect or store:</p>

        <ul className="list-disc space-y-1 pl-6">
          <li>Your online banking passwords;</li>
          <li>Your bank login credentials;</li>
          <li>Your full payment card details.</li>
        </ul>

        <p>
          Authentication with your bank is handled directly through the Open
          Banking provider.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          4. How We Use Your Information
        </h2>

        <p>We use collected information to:</p>

        <ul className="list-disc space-y-1 pl-6">
          <li>Provide and maintain the Service;</li>
          <li>Synchronize bank transactions;</li>
          <li>Categorize expenses;</li>
          <li>Generate financial insights and charts;</li>
          <li>Improve functionality and reliability;</li>
          <li>Maintain security and prevent fraud.</li>
        </ul>

        <p>We do not use your financial information to:</p>

        <ul className="list-disc space-y-1 pl-6">
          <li>Sell your personal data;</li>
          <li>Provide targeted advertising;</li>
          <li>Create commercial profiles about you.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">5. Third-Party Services</h2>

        <p>
          To operate the Service, we may rely on third-party providers,
          including:
        </p>

        <ul className="list-disc space-y-1 pl-6">
          <li>Plaid for Open Banking connections;</li>
          <li>Neon/PostgreSQL for database storage;</li>
          <li>Vercel for application hosting;</li>
          <li>Resend for transactional emails;</li>
          <li>Authentication providers.</li>
        </ul>

        <p>
          These providers process information only as necessary to provide their
          services.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">6. Data Storage and Retention</h2>

        <p>
          We store personal information only for as long as necessary to provide
          the Service and comply with applicable legal obligations.
        </p>

        <p>Users may request:</p>

        <ul className="list-disc space-y-1 pl-6">
          <li>Deletion of their account;</li>
          <li>Deletion of their personal data;</li>
          <li>Removal of connected bank accounts.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">7. Data Security</h2>

        <p>
          We implement appropriate technical and organizational measures to
          protect user information, including:
        </p>

        <ul className="list-disc space-y-1 pl-6">
          <li>HTTPS encryption;</li>
          <li>Secure authentication mechanisms;</li>
          <li>Access controls;</li>
          <li>Protection of sensitive credentials;</li>
          <li>Secure storage of Open Banking tokens.</li>
        </ul>

        <p>However, no online service can guarantee complete security.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">8. Your Rights</h2>

        <p>You may have the right to:</p>

        <ul className="list-disc space-y-1 pl-6">
          <li>Access your personal data;</li>
          <li>Correct inaccurate information;</li>
          <li>Request deletion of your data;</li>
          <li>Restrict or object to processing;</li>
          <li>Receive a copy of your personal information.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">9. Cookies</h2>

        <p>
          The Service uses cookies necessary for essential functionality,
          including authentication and security.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          10. Changes to This Privacy Policy
        </h2>

        <p>
          We may update this Privacy Policy from time to time. Significant
          changes will be communicated to users.
        </p>
      </section>
    </main>
  );
}
