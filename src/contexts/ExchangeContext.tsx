import { createContext, ReactNode, useEffect, useState } from "react";

import ExchangeController from "../controller/ExchangeController";

interface ExchangeContextType {
  usd: any;
}

export const ExchangeContext = createContext<ExchangeContextType | undefined>(
  undefined
);

export const ExchangeProvider = ({ children }: { children: ReactNode }) => {
  const [usd, setUsd] = useState<any>(null);

  useEffect(() => {
    const controller = new ExchangeController({
      modelName: "EXCHANGE",
      modelId: "exchange",
    });

    controller.getExchange().then((response) => {
      setUsd(
        response.data.result.filter((item: any) => item.CURRENCY === "USD")[0]
          .EXCHANGE_RATE
      );
    });
  }, []);

  return (
    <ExchangeContext.Provider value={{ usd }}>
      {children}
    </ExchangeContext.Provider>
  );
};
