import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-sm:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>

      <p className="desc text-center">
        Prompt It is an open-source AI prompting tool that uses GPT-3 to
        generate prompts for you to use in your writing.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
