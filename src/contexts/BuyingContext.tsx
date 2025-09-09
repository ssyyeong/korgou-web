import React, { createContext, useContext, useState } from "react";

// 타입 정의
export interface ProductData {
  URL: string;
  OPTION: string;
  QUANTITY: string;
  AMOUNT: string;
  REMARK: string;
}

interface BuyingState {
  authYn: string;
  shoppingMallUrl: string;
  shoppingMallId: string;
  shoppingMallPw: string;
  shoppingMallAmount: string;
  deliveryRequest: string;
  deliveryType: string;
  process: string;
  productList: ProductData[];
  setAuthYn: (value: string) => void;
  setShoppingMallUrl: (value: string) => void;
  setShoppingMallId: (value: string) => void;
  setShoppingMallPw: (value: string) => void;
  setShoppingMallAmount: (value: string) => void;
  setDeliveryType: (value: string) => void;
  setDeliveryRequest: (value: string) => void;
  setProcess: (value: string) => void;
  setProductList: (products: ProductData[]) => void;
}

const BuyingContext = createContext<BuyingState | undefined>(undefined);

export const BuyingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authYn, setAuthYn] = useState<string>("Y");
  const [shoppingMallUrl, setShoppingMallUrl] = useState<string>("");
  const [shoppingMallId, setShoppingMallId] = useState<string>("");
  const [shoppingMallPw, setShoppingMallPw] = useState<string>("");
  const [shoppingMallAmount, setShoppingMallAmount] = useState<string>("");
  const [deliveryType, setDeliveryType] = useState<string>("domestic");
  const [deliveryRequest, setDeliveryRequest] = useState<string>("");
  const [process, setProcess] = useState<string>("progress");
  const [productList, setProductList] = useState<ProductData[]>([]);

  return (
    <BuyingContext.Provider
      value={{
        authYn,
        shoppingMallUrl,
        shoppingMallId,
        shoppingMallPw,
        shoppingMallAmount,
        deliveryType,
        deliveryRequest,
        process,
        productList,
        setAuthYn,
        setShoppingMallUrl,
        setShoppingMallId,
        setShoppingMallPw,
        setShoppingMallAmount,
        setDeliveryType,
        setDeliveryRequest,
        setProcess,
        setProductList,
      }}
    >
      {children}
    </BuyingContext.Provider>
  );
};

export const useBuying = () => {
  const context = useContext(BuyingContext);
  if (!context) {
    throw new Error("useBuying은 BuyingProvider 내부에서만 사용해야 합니다.");
  }
  return context;
};
