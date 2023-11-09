"use client";

import { useEffect, useRef, useState } from "react";
import { BsTag } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";

export default function TagSelector() {
  const availableTags: string[] = [
    "technology",
    "science",
    "art",
    "trave",
    "food",
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayTags, setDisplayTags] = useState<boolean>(false);
  const tagSelectorRef = useRef<HTMLDivElement>(null);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      const updatedTags = selectedTags.filter(
        (selectedTag) => selectedTag !== tag
      );
      setSelectedTags(updatedTags);
      toast.success(`Removed ${tag}`);
    } else {
      setSelectedTags([...selectedTags, tag]);
      toast.success(`Added ${tag}`);
    }
    setSearchTerm("");
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = selectedTags.filter(
      (selectedTag) => selectedTag !== tag
    );
    setSelectedTags(updatedTags);
    toast.error(`Removed ${tag}`);
  };

  const filteredTags = searchTerm
    ? availableTags.filter(
        (tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !selectedTags.includes(tag)
      )
    : [];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setDisplayTags(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      tagSelectorRef.current &&
      !tagSelectorRef.current.contains(e.target as Node)
    ) {
      setDisplayTags(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="h-[100vh] flex items-center justify-center bg-rose-500">
      <div className="w-[25rem]">
        <h3 className="text-[1.5rem] font-semibold text-slate-100 mb-3">
          Select Tags:
        </h3>
        <div className="relative" ref={tagSelectorRef}>
          <div className="relative">
            <BsTag className="absolute top-[1rem] text-[1.2rem] left-[0.96rem] text-rose-500" />
            <input
              className="w-full h-[3rem] pl-[2.9rem] text-rose-500 text-[1rem] font-semibold placeholder:text-rose-500/40 placeholder:font-semibold focus:outline-none"
              type="text"
              placeholder="Search tags"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={() => setDisplayTags(true)}
            />
          </div>
          {displayTags && (
            <ul className="absolute top-[3.5rem] left-[2.9rem] bg-slate-100 w-[22.1rem]">
              {filteredTags.map((tag) => (
                <li
                  className="cursor-pointer py-2 first:mt-4 last:mb-4 px-6 
                  border-l-4 border-transparent
                  hover:border-l-4 hover:border-rose-300 hover:bg-rose-300/20"
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-[2rem] w-[25rem]">
          <ul className="flex flex-wrap gap-3">
            {selectedTags.map((tag) => (
              <li
                className="bg-slate-100 text-rose-500 font-semibold rounded-full py-1 px-4 flex justify-center gap-2"
                key={tag}
              >
                <p>{tag}</p>
                <button
                  className="flex items-center justify-center"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <AiOutlineCloseCircle className="text-xl" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
