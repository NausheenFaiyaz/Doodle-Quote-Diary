function QuoteCard({ content, author, tags = [] }) {
  return (
    <article className="quote-card">
      <p className="quote-card__title">Reminder:</p>
      <p className="quote-card__content">{content}</p>
      <p className="quote-card__author">- {author || 'Unknown'}</p>
      {tags.length > 0 && (
        <p className="quote-card__tag">
          {tags.map((tag) => `#${tag}`).join(' ')}
        </p>
      )}
    </article>
  );
}

export default QuoteCard;
