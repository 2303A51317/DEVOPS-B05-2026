function Header() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <h1>Greenfield University</h1>
      <nav>
        <ul>
          <li onClick={() => scrollTo('home')}>Home</li>
          <li onClick={() => scrollTo('courses')}>Courses</li>
          <li onClick={() => scrollTo('registration')}>Registration</li>
          <li onClick={() => scrollTo('profile')}>Profile</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;