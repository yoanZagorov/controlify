<div className="grid grid-cols-1 grid-rows-2 tab:grid-cols-10 gap-14">
<div className={`tab:col-span-6 tab:row-span-2 ${isWalletsEven ? "max-w-[500px]" : "max-w-[700px]"} grid gap-10`}>
  <div>
    <h2 className="text-3xl text-navy-dark font-semibold tracking-wide">Balance</h2>
    <Widget
      icon={<ScaleIcon className="w-5 h-5 fill-gray-dark" />}
      title="Current"
    >
      <h3 className="mt-3 text-navy-dark text-2xl font-bold">{defaultCurrency} {balance}</h3>
    </Widget>
  </div>

  <div>
    <h2 className="text-3xl text-navy-dark font-semibold tracking-wide">Wallets</h2>
    <div className="grid grid-cols-1 mm:grid-cols-2 w-full gap-6">
      {walletEls}

      <WidgetWrapper
        className={`items-center ${isWalletsEven ? "col-span-full" : "col-span-1"}`}
      >
        <h4 className="text-navy-dark font-bold">Add Wallet</h4>
        <button className="mt-1.5 w-12 h-12 rounded-full">
          <PlusCircleIcon size="48" />
        </button>
      </WidgetWrapper>
    </div>
  </div>
</div>

<div className={`tab:col-span-4 tab:row-span-2 flex flex-col ${isWalletsEven ? "max-w-[500px]" : "max-w-[700px]"}`}>
  <h2 className="text-3xl text-navy-dark font-semibold tracking-wide">Transactions</h2>
  <Widget
    icon={<CalendarIcon className="w-5 h-5 fill-gray-dark" />}
    title="Today"
    className="flex-grow"
  >
  </Widget>
</div>
</div>