export default function AnalyticsPage() {
  return (
    <div className="fixed left-0 right-0 bottom-0 z-10" style={{ top: "64px" }}>
      <iframe
        src="https://dashboard.scogo.in/d/aeoufwlmh105cf/apni-pathshala-parental-control?orgId=2&var-uid=All&var-url=All&var-podname=All&from=now-6h&to=now"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Analytics Dashboard"
        allowFullScreen
      />
    </div>
  );
}
