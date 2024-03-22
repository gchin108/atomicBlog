"use client";
import { usePosts } from "./PostProvider";
import TextExpander from "./TextExpander";
import { useState, useRef, useEffect } from "react";

export default function ListItem({ toLearn }) {
  const { onLearn, onUpdate } = usePosts();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(toLearn.title);
  const [editedContent, setEditedContent] = useState(toLearn.body);
  const postRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (postRef.current && !postRef.current.contains(event.target)) {
        setIsEditing(false); // Click was outside the note
      }
    }

    if (isEditing) {
      // Add a short delay before adding the event listener to avoid capturing the initial click
      const timerId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100); // 100ms should be sufficient, but you can adjust as needed
      
      return () => {
        clearTimeout(timerId); // Clear the timeout if the effect is cleaned up before the timeout fires
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isEditing]);

  // useEffect(() => {
  //   setEditedTitle(toLearn.title);
  //   setEditedContent(toLearn.body);
  // }, [toLearn.title, toLearn.body]);

  return isEditing ? (
    <div
      ref={postRef}
      className="border-[1px] max-w-fit border-solid border-[#ffe8cc] !dark:hover:bg-gray-600 px-5 py-4 flex flex-col"
    >
      <input
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        className="capitalize font-bold text-xl mb-[16px] dark:text-black "
      />

      <textarea
        className="h-[100px] resize-none dark:text-black"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />

      <button
        onClick={() => {
          onUpdate(toLearn._id, editedTitle, editedContent);
          setIsEditing(false);
        }}
        className="mt-2 w-fit self-center hover:text-orange-500"
      >
        Save
      </button>
    </div>
  ) : (
    <div className="border-[1px] border-solid border-[#ffe8cc] dark:hover:bg-gray-600 hover:bg-[#fff4e6] py-[16px] px-[20px]">
      <h3 className="capitalize font-bold text-xl mb-[16px] dark:text-gray-200 flex justify-between">
        {toLearn.title}
        <button
          className="text-sm hover:bg-red-700"
          onClick={() => onLearn(toLearn._id)}
        >
          ☑️
        </button>
      </h3>

      <div>
        <TextExpander
          textStyle="cursor-pointer hover:text-red-400 "
          textOnCliked={() => setIsEditing(true)}
        >
          {toLearn.body}
        </TextExpander>
      </div>
    </div>
  );
}
