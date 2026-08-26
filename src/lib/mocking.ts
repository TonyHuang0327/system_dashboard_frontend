/** 與 main.tsx 啟動 MSW 的條件相同：僅開發模式，且未明確關閉 */
export function isMockingEnabled(): boolean {
  return (
    import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKING !== "false"
  );
}
