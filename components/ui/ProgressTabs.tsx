import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import React from "react";
import ProgressBodyMeasures from "./ProgressBodyMeasures";
import ProgressWorkouts from "./ProgressWorkouts";
import ProgressWeight from "./ProgressWeight";
import ProgressPhotos from "./ProgressPhotos";

const tabs = [
  { label: "Medidas", key: "body" },
  { label: "Treinos", key: "workouts" },
  { label: "Peso", key: "weight" },
  { label: "Fotos", key: "photos" },
];

export default function ProgressTabs({ alunoId }: { alunoId: string }) {
  return (
    <Tabs defaultValue={tabs[0].key} className="w-full">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.key} value={tab.key}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="body">
        <ProgressBodyMeasures alunoId={alunoId} />
      </TabsContent>
      <TabsContent value="workouts">
        <ProgressWorkouts alunoId={alunoId} />
      </TabsContent>
      <TabsContent value="weight">
        <ProgressWeight alunoId={alunoId} />
      </TabsContent>
      <TabsContent value="photos">
        <ProgressPhotos alunoId={alunoId} />
      </TabsContent>
    </Tabs>
  );
} 