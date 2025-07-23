export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST allowed");
  }

  const body = await req.text(); // đọc raw body
  const signature = req.headers['x-signature'];

  console.log("=== PAYOS WEBHOOK (proxy) ===");
  console.log("Signature:", signature);
  console.log("Body:", body);

  // Gửi dữ liệu sang máy chủ gốc của bạn (webhost)
  const forwardRes = await fetch("https://shopaccww.liveblog365.com/api/webhook.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-signature": signature || "",
    },
    body: body
  });

  const result = await forwardRes.text();
  console.log("Forwarded to hosting, response:", result);

  res.status(200).send("OK");
}
