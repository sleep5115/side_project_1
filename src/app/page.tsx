"use client";

import { useMemo, useState } from "react";

type Profile = {
  id: number;
  age: number;
  height: number;
  salary: number;
};

const TOTAL_PROFILES = 100;

function generateProfiles(count: number): Profile[] {
  const profiles: Profile[] = [];

  for (let i = 0; i < count; i++) {
    profiles.push({
      id: i,
      age: 22 + Math.floor(Math.random() * 19), // 22~40
      height: 155 + Math.floor(Math.random() * 31), // 155~185
      salary: 2500 + Math.floor(Math.random() * 51) * 100, // 2,500~7,000 (단위: 만원)
    });
  }

  return profiles;
}

export default function Home() {
  const profiles = useMemo(() => generateProfiles(TOTAL_PROFILES), []);

  const [minAge, setMinAge] = useState(28);
  const [minHeight, setMinHeight] = useState(170);
  const [minSalary, setMinSalary] = useState(4000);

  const filteredProfiles = profiles.filter(
    (p) => p.age >= minAge && p.height >= minHeight && p.salary >= minSalary
  );

  const matchCount = filteredProfiles.length;
  const matchPercent = Math.round((matchCount / TOTAL_PROFILES) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black px-4 py-8 text-slate-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-3xl bg-slate-900/60 p-6 shadow-xl ring-1 ring-slate-800/80 backdrop-blur-md md:p-8 lg:flex-row lg:gap-10">
        {/* 좌측 / 상단: 필터 & 결과 */}
        <section className="flex w-full flex-col gap-6 lg:w-[38%]">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-sky-400/80">
              Matching Preview
            </p>
            <h1 className="text-2xl font-semibold leading-relaxed tracking-tight text-slate-50 md:text-3xl">
              결정사 가기 전,
              <br />
              내 주제 파악하기
            </h1>
            <p className="text-sm leading-relaxed text-slate-400">
              이상적인 상대의 조건을 슬라이더로 조절하면서, 실제로 몇 명이나 남는지
              직관적으로 확인해 보세요.
            </p>
          </div>

          <div className="space-y-6 rounded-2xl bg-slate-900/70 p-4 ring-1 ring-slate-800">
            <FilterSlider
              label="나이"
              value={minAge}
              min={22}
              max={40}
              step={1}
              unit="세 이상"
              description="연애/결혼을 고려하는 최소 나이대를 설정해요."
              onChange={setMinAge}
            />

            <FilterSlider
              label="키"
              value={minHeight}
              min={155}
              max={190}
              step={1}
              unit="cm 이상"
              description="내가 선호하는 최소 키를 설정해요."
              onChange={setMinHeight}
            />

            <FilterSlider
              label="연봉"
              value={minSalary}
              min={2500}
              max={7000}
              step={100}
              unit="만원 이상"
              description="현실적인 연봉 기준선을 한 번 잡아봐요."
              onChange={setMinSalary}
            />
          </div>

          <div className="space-y-2 rounded-2xl border border-sky-500/20 bg-sky-500/5 px-4 py-3 text-sm">
            <p className="font-medium text-sky-300">
              조건에 부합하는 사람은{" "}
              <span className="text-lg font-semibold text-sky-300">
                {matchCount}명
              </span>{" "}
              (전체 100명 중{" "}
              <span className="font-semibold text-sky-300">
                {matchPercent}%
              </span>
              ) 입니다.
            </p>
            <p className="text-xs text-slate-400">
              숫자가 생각보다 적다면, 기준을 조금 완화해 보는 것도 하나의 전략이에요.
            </p>
          </div>
        </section>

        {/* 우측 / 하단: 프로필 그리드 */}
        <section className="w-full rounded-2xl bg-slate-950/40 p-4 ring-1 ring-slate-800/80 lg:w-[62%] lg:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-slate-100">
                조건에 맞는 프로필 미리보기
              </p>
              <p className="text-xs text-slate-500">
                카카오톡 기본 프로필 스타일의 아이콘으로 시각화했어요.
              </p>
            </div>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
              {matchCount} / {TOTAL_PROFILES}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-3 xs:grid-cols-7 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-8 xl:grid-cols-10">
            {filteredProfiles.map((profile) => (
              <ProfileIcon key={profile.id} />
            ))}

            {filteredProfiles.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center gap-2 py-10 text-center">
                <div className="h-14 w-14 rounded-full bg-sky-400/10 ring-2 ring-sky-500/40" />
                <p className="text-sm font-medium text-slate-200">
                  조건에 맞는 사람이 없어요.
                </p>
                <p className="max-w-xs text-xs text-slate-500">
                  현실에서 만날 수 있는 사람의 폭을 넓히고 싶은 마음이 있다면,
                  기준도 살짝만 넓혀볼까요?
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

type FilterSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  description?: string;
  onChange: (value: number) => void;
};

function FilterSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  description,
  onChange,
}: FilterSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-100">{label}</span>
          {description && (
            <span className="text-xs text-slate-500">{description}</span>
          )}
        </div>
        <span className="text-xs font-medium text-sky-300">
          {value.toLocaleString()}
          {unit && <span className="ml-0.5 text-slate-300">{unit}</span>}
        </span>
      </div>

      <div className="group relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800/90 accent-sky-400"
        />

        <div className="mt-1 flex justify-between text-[10px] text-slate-500">
          <span>{min.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function ProfileIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-400 shadow-[0_0_0_1px_rgba(15,23,42,0.9)] ring-2 ring-sky-300/80 xs:h-11 xs:w-11 sm:h-12 sm:w-12">
      <div className="flex h-7 w-7 flex-col items-center justify-center rounded-full bg-sky-200/90 text-sky-600 shadow-inner">
        <div className="h-2.5 w-2.5 rounded-full bg-sky-400/90" />
        <div className="mt-0.5 h-2.5 w-4 rounded-full bg-sky-400/90" />
      </div>
    </div>
  );
}
