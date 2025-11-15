import React from "react";
export default function ContentCard({ content }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-bold">{content.title}</h3>
      <p>{content.description}</p>
    </div>
  );
}