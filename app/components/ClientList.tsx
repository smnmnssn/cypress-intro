export default function ClientList() {
  return (
    <div>
      <h1 data-cy="clients-title">Kunder</h1>
      <button id="create-new-button">Skapa ny</button>
      <ol id="client-list">
        <li>Anna Andersson</li>
      </ol>
    </div>
  );
}
