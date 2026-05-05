function Header({ totalQuotes, onSearch, defaultQuery }) {
  return (
    <header className="header-wrap">
      <h1>Doodle Quote Diary</h1>
      <p>Chaos, captured in words</p>
      <p>{totalQuotes > 0 ? `${totalQuotes} quotes found` : 'Loading all 300 quotes...'}</p>
      <form className="search-form" onSubmit={onSearch}>
        <input
          type="text"
          name="query"
          defaultValue={defaultQuery}
          placeholder="Search by quote, author, or tag"
          aria-label="Search quotes"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;
