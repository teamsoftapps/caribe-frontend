<form onSubmit={handleSubmit}>
  <div className="form-control">
    <input
      type="text"
      id="Firstname"
      name="firstname"
      value={values.firstname}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="First Name"
    />
    <input
      type="text"
      id="Lastname"
      name="lastname"
      value={values.lastname}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <input
      type="text"
      id="Shippingaddress"
      name="shippingaddress"
      value={values.shippingaddress}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <input
      type="text"
      id="City"
      name="city"
      value={values.city}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <input
      type="text"
      id="Country"
      name="country"
      value={values.country}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <input
      type="text"
      id="Province"
      name="province"
      value={values.province}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <input
      type="text"
      id="Postcode"
      name="postcode"
      value={values.postcode}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <input
      type="text"
      id="Email"
      name="email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
    />

    {touched.email && errors.email ? (
      <p style={invalitStyle}>{errors.email}</p>
    ) : (
      ""
    )}
  </div>

  <div className="form-actions">
    <button type="submit">Submit</button>
  </div>
</form>;
