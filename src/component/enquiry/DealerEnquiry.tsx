export default function DealerEnquiry() {
  return (
    <section className="enquiry">
      <h2>🛒 Become a Dealer</h2>
      <form className="enquiry-form">
        <input placeholder="Dealer Name" />
        <input placeholder="Mobile Number" />
        <input placeholder="Location" />
        <select>
          <option>Select Seed</option>
          <option>Chia Seeds</option>
          <option>Pink Onion Seeds</option>
        </select>
        <button type="submit">Submit Enquiry</button>
      </form>
    </section>
  );
}