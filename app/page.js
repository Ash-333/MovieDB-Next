import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTkwNTdiY2NjNzI4YTIxOTcyNTZiZGMwZTVjODdmNyIsIm5iZiI6MTczMTQ5ODU0Mi4xODIzMDY1LCJzdWIiOiI2NzM0OTBmZWE2N2UzNmJiNjY4ZDkyZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.egwj0ALwfypDNUUjWQiH1pmWiLCkPr14FlDV7oC57Jw",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular",
    options
  );
  const data = await response.json();
  const movies = data.results;

  return (
    <div className="p-8 bg-slate-600">
      <h2 className="text-xl font-bold mb-4">Trending Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden drop-shadow-xl"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-500">{movie.title}</h3>
              <p className="text-gray-400 text-sm">
                Release Date: {movie.release_date}
              </p>
              <Link href={`/movies/${movie.id}`}>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
