export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q") || "";

  console.log("API /api/search dipanggil dengan keyword:", keyword); // ✅ TARUH DI SINI

  // Escape special characters in keyword to prevent SPARQL injection
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX ns: <http://example.org/jawa#>

SELECT ?cerita ?aksara ?terjemahan ?latin WHERE {
  ?cerita ns:aksara ?aksara ;
          ns:terjemahan ?terjemahan ;
          ns:latin ?latin .

  FILTER (
    CONTAINS(LCASE(STR(?terjemahan)), LCASE("${escapedKeyword}")) ||
    CONTAINS(LCASE(STR(?aksara)), LCASE("${escapedKeyword}")) ||
    CONTAINS(LCASE(STR(?latin)), LCASE("${escapedKeyword}"))
  )
}
ORDER BY ?cerita
LIMIT 50

  `;

  try {
    const response = await fetch("http://localhost:3030/Jawa/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/sparql-query",
        Accept: "application/sparql-results+json",
      },
      body: query,
    });

    if (!response.ok) {
      throw new Error(`SPARQL query failed: ${response.statusText}`);
    }

    const result = await response.json();

    const formatted = (result?.results?.bindings || []).map((item) => ({
      cerita: item.cerita?.value || "",
      aksara: item.aksara?.value || "",
      terjemahan: item.terjemahan?.value || "",
      latin: item.latin?.value || "",
    }));

    return Response.json(formatted);
  } catch (error) {
    console.error("SPARQL query error:", error);
    return Response.json(
      { error: "Failed to fetch data", message: error.message },
      { status: 500 }
    );
  }
}
