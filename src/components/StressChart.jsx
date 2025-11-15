import React from "react";
export default function StressChart({ data, type = "line" }) {
  // 간단한 차트 구현 (실제로는 recharts, chart.js 등 사용 권장)
  
  if (type === "line") {
    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));
    const range = maxValue - minValue || 1;

    return (
      <div className="w-full h-64 relative">
        {/* Y축 라벨 */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500">
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
        </div>

        {/* 차트 영역 */}
        <div className="ml-10 mr-4 h-full flex items-end justify-between gap-1">
          {data.map((item, index) => {
            const height = ((item.value - minValue) / range) * 100;
            const color = item.value >= 4 ? "bg-red-500" : item.value >= 3 ? "bg-orange-400" : "bg-green-500";

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                {/* 막대 */}
                <div className="w-full flex items-end justify-center" style={{ height: "200px" }}>
                  <div
                    className={`w-full ${color} rounded-t-lg transition-all hover:opacity-80 relative group`}
                    style={{ height: `${height}%`, minHeight: "4px" }}
                  >
                    {/* 툴팁 */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.value}
                    </div>
                  </div>
                </div>

                {/* X축 라벨 */}
                <span className="text-xs text-gray-600 transform -rotate-45 origin-top-left whitespace-nowrap">
                  {item.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === "bar") {
    const maxValue = Math.max(...data.map((d) => d.value));

    return (
      <div className="w-full h-64 flex items-end justify-between gap-4 px-4">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          const color = item.value >= 4 ? "from-red-400 to-red-600" : item.value >= 3 ? "from-orange-400 to-orange-600" : "from-green-400 to-green-600";

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-3">
              {/* 막대 */}
              <div className="w-full flex items-end justify-center" style={{ height: "200px" }}>
                <div
                  className={`w-full bg-gradient-to-t ${color} rounded-t-xl transition-all hover:opacity-80 relative group`}
                  style={{ height: `${height}%`, minHeight: "8px" }}
                >
                  {/* 값 표시 */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700">
                    {item.value}
                  </div>
                </div>
              </div>

              {/* X축 라벨 */}
              <span className="text-sm font-semibold text-gray-700">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}
