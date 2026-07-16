"use client";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};
export default function SearchBar(props: Props) {
  return (
    <div className="flex flex-row px-4 py-2 bg-white border-stone-400 rounded-4xl text-sm shadow-sm shadow-stone-500/50">
      <input
        type="text"
        value={props.search}
        onChange={(e) => props.setSearch(e.currentTarget.value)}
        placeholder="Search"
        className="outline-none "
      />
    </div>
  );
}
