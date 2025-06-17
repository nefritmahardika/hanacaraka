export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q") || "";

  console.log("API /api/search dipanggil dengan keyword:", keyword);

  // Escape special characters in keyword to prevent SPARQL injection
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX ex: <http://example.org/jawa#>

SELECT ?cerita ?judul ?aksara ?terjemahan ?latin ?kalimat WHERE {
  ?kalimat ex:aksara ?aksara ;
           ex:terjemahan ?terjemahan ;
           ex:latin ?latin ;
           ex:bagianDari ?cerita .
  OPTIONAL { ?cerita ex:judul ?judul }
  
  FILTER (
    CONTAINS(LCASE(STR(?terjemahan)), LCASE("${escapedKeyword}")) ||
    CONTAINS(LCASE(STR(?aksara)), LCASE("${escapedKeyword}")) ||
    CONTAINS(LCASE(STR(?latin)), LCASE("${escapedKeyword}")) ||
    CONTAINS(LCASE(STR(?judul)), LCASE("${escapedKeyword}"))
  )
}
ORDER BY ?cerita ?kalimat
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
      judul: item.judul?.value || null,
      aksara: item.aksara?.value || "",
      terjemahan: item.terjemahan?.value || "",
      latin: item.latin?.value || "",
      kalimat: item.kalimat?.value || null,
    }));

    console.log(`Found ${formatted.length} results for keyword: "${keyword}"`);

    return Response.json(formatted);
  } catch (error) {
    console.error("SPARQL query error:", error);
    return Response.json(
      { error: "Failed to fetch data", message: error.message },
      { status: 500 }
    );
  }
}