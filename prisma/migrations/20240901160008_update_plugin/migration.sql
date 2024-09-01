-- AlterTable
ALTER TABLE "Plugin" ADD COLUMN     "model" TEXT NOT NULL DEFAULT 'antropic.claude-v 2:1',
ADD COLUMN     "predictionId" TEXT,
ADD COLUMN     "region" TEXT NOT NULL DEFAULT 'us-west-2';

-- CreateTable
CREATE TABLE "Prediction" (
    "id" TEXT NOT NULL,
    "enterpriseId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "data" JSONB NOT NULL,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PluginToPrediction" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PluginToPrediction_AB_unique" ON "_PluginToPrediction"("A", "B");

-- CreateIndex
CREATE INDEX "_PluginToPrediction_B_index" ON "_PluginToPrediction"("B");

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PluginToPrediction" ADD CONSTRAINT "_PluginToPrediction_A_fkey" FOREIGN KEY ("A") REFERENCES "Plugin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PluginToPrediction" ADD CONSTRAINT "_PluginToPrediction_B_fkey" FOREIGN KEY ("B") REFERENCES "Prediction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
