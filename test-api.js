const url = "https://script.google.com/macros/s/AKfycbw9iWY2BpGM-HZ3JXbsJ_AP7IfqrhtytaPCa-UQ20fI4CJxPX2wd1U0ZyPe0qiMVWS0uQ/exec";

async function test() {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        namaLengkap: "Test Local",
        jenisKelamin: "Putra"
      })
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (err) {
    console.error(err);
  }
}

test();
