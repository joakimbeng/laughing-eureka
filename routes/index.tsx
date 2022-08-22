/** @jsx h */
import {h} from 'preact';
import {tw} from '@twind';
import {Handlers} from '$fresh/server.ts';
import Counter from '../islands/Counter.tsx';

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url);

    if (url.searchParams.has('name')) {
      const redirectUrl = new URL(url.origin);
      redirectUrl.pathname = `/${url.searchParams.get('name')}`;

      return new Response(null, {
        status: 302,
        headers: new Headers({
          location: redirectUrl.href,
        }),
      });
    }

    return ctx.render();
  },
};

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6 text-gray-700`}>
        Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <form>
        <label for="name" class={tw`block text-gray-700`}>
          Name
        </label>
        <input
          id="name"
          name="name"
          class={tw`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:(outline-none ring-2 ring-indigo-500 border-indigo-500)`}
        />
        <button
          type="submit"
          class={tw`mt-2 inline-flex items-center text-base font-medium text-white px-6 py-3 border(transparent) bg-indigo-600 hover:bg-indigo-700 focus:(outline-none ring-2 ring-offset-2 ring-indigo-500) rounded-md`}
        >
          Submit
        </button>
      </form>
      <Counter start={3} />
    </div>
  );
}
