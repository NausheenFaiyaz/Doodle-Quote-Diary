import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import QuoteCard from './components/QuoteCard';
import PrevButton from './components/PrevButton';
import NextButton from './components/NextButton';
import './App.css';

const TOTAL_PAGES = 30;
const PAGE_LIMIT = 10;
const QUOTES_PER_VIEW = 1;

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAllQuotes() {
      setIsLoading(true);
      setError('');

      try {
        const requests = Array.from({ length: TOTAL_PAGES }, (_, index) => {
          const page = index + 1;
          const url = `https://api.freeapi.app/api/v1/public/quotes?page=${page}&limit=${PAGE_LIMIT}`;

          return fetch(url, {
            method: 'GET',
            headers: {
              accept: 'application/json',
            },
            signal: controller.signal,
          }).then((response) => {
            if (!response.ok) {
              throw new Error(`Failed on page ${page}.`);
            }
            return response.json();
          });
        });

        const results = await Promise.all(requests);
        const allQuotes = results.flatMap((payload) => payload?.data?.data ?? []);

        if (allQuotes.length === 0) {
          throw new Error('No quotes found from the API.');
        }

        setQuotes(allQuotes);
        setCurrentPage(1);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Something went wrong.');
          setQuotes([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllQuotes();

    return () => controller.abort();
  }, []);

  const filteredQuotes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return quotes;

    return quotes.filter((item) => {
      const content = item?.content?.toLowerCase() ?? '';
      const author = item?.author?.toLowerCase() ?? '';
      const tags = Array.isArray(item?.tags) ? item.tags.join(' ').toLowerCase() : '';
      return content.includes(normalized) || author.includes(normalized) || tags.includes(normalized);
    });
  }, [quotes, query]);

  const totalQuotes = filteredQuotes.length;
  const totalPages = Math.max(1, Math.ceil(totalQuotes / QUOTES_PER_VIEW));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * QUOTES_PER_VIEW;
  const visibleQuotes = filteredQuotes.slice(start, start + QUOTES_PER_VIEW);
  const isFirst = safePage === 1;
  const isLast = safePage === totalPages;

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setQuery(formData.get('query')?.toString() ?? '');
    setCurrentPage(1);
  };

  return (
    <main className="app-shell">
      <Header totalQuotes={totalQuotes} onSearch={handleSearch} defaultQuery={query} />

      <section className="quote-stage" aria-live="polite">
        {isLoading && <p className="state-text">Loading quotes...</p>}

        {error && !isLoading && <p className="state-text error-text">{error}</p>}

        {!isLoading && !error && visibleQuotes.length > 0 && (
          <QuoteCard
            key={visibleQuotes[0].id}
            content={visibleQuotes[0].content}
            author={visibleQuotes[0].author}
            tags={visibleQuotes[0].tags}
          />
        )}

        {!isLoading && !error && totalQuotes === 0 && <p className="state-text">No quotes matched your search.</p>}
      </section>

      <div className="controls-row">
        <PrevButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={isFirst || isLoading || totalQuotes === 0}
        />
        <p className="page-text">
          {totalQuotes === 0 ? 'Page 0 of 0' : `Page ${safePage} of ${totalPages} (${totalQuotes} quotes)`}
        </p>
        <NextButton
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={isLast || isLoading || totalQuotes === 0}
        />
      </div>
    </main>
  );
}

export default App;
