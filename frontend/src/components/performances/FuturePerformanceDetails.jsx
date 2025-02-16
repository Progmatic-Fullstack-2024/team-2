export default function FuturePerformanceDetails({ futurePerformance }) {
  if (!futurePerformance?.id) {
    return null; // Ha nincs futurePerformance, ne jelenjen meg semmi
  }

  // Költségvetési adatok kiszámítása százalékban
  const { actualBudget, targetBudgetIdeal, targetBudget, minimumBudget } = futurePerformance;

  const getPercentage = (value) => (value > 0 ? Math.min((actualBudget / value) * 100, 100) : 0);

  const percentageIdeal = getPercentage(targetBudgetIdeal);
  const percentageTarget = getPercentage(targetBudget);
  const percentageMinimum = getPercentage(minimumBudget);

  // Progress bar színátmenetes háttere: minimum alatt piros, cél alatt narancs, cél felett zöld
  const getGradientBar = (percentage) => {
    if (percentage >= 100) return 'bg-gradient-to-r from-green-400 to-green-600 shadow-lg';
    if (percentage >= 75) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-md';
    if (percentage >= 50) return 'bg-gradient-to-r from-orange-400 to-orange-600 shadow-sm';
    return 'bg-gradient-to-r from-red-400 to-red-600 shadow-sm';
  };

  return (
    <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl overflow-hidden p-8 mt-10 border border-gray-300">
      <h2 className="text-3xl font-extrabold text-c-primary-dark mb-6 text-center">
        Támogatsd az előadás létrejöttét!
      </h2>

      {/* Jelenlegi támogatás */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center mb-6">
        <p className="text-lg font-semibold">Az előadás aktuális költségvetése:</p>
        <p className="text-3xl font-extrabold text-green-600">{actualBudget.toLocaleString()} Ft</p>
      </div>

      {/* Progress bars */}
      <div className="space-y-6">
        {/* Ideális Célköltségvetés */}
        <div>
          <p className="text-lg font-semibold mb-2">
            Ideális célköltségvetés ({targetBudgetIdeal.toLocaleString()} Ft)
          </p>
          <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden shadow-inner">
            <div
              className={`h-full ${getGradientBar(percentageIdeal)} transition-all duration-700 ease-out rounded-full`}
              style={{ width: `${percentageIdeal}%` }}
            />
          </div>
          <p className="text-sm text-right">{percentageIdeal.toFixed(1)}%</p>
        </div>

        {/* Célköltségvetés */}
        <div>
          <p className="text-lg font-semibold mb-2">
            Célköltségvetés ({targetBudget.toLocaleString()} Ft)
          </p>
          <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden shadow-inner">
            <div
              className={`h-full ${getGradientBar(percentageTarget)} transition-all duration-700 ease-out rounded-full`}
              style={{ width: `${percentageTarget}%` }}
            />
          </div>
          <p className="text-sm text-right">{percentageTarget.toFixed(1)}%</p>
        </div>

        {/* Minimum költségvetés */}
        <div>
          <p className="text-lg font-semibold mb-2">
            Minimum költségvetés ({minimumBudget.toLocaleString()} Ft)
          </p>
          <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden shadow-inner">
            <div
              className={`h-full ${getGradientBar(percentageMinimum)} transition-all duration-700 ease-out rounded-full`}
              style={{ width: `${percentageMinimum}%` }}
            />
          </div>
          <p className="text-sm text-right">{percentageMinimum.toFixed(1)}%</p>
        </div>
      </div>

      {/* Ajándék támogatóknak */}
      <div className="mt-8 text-center">
        <p className="text-lg">Ha 15 000 Forinttal támoagatod az előadás létrejöttét:</p>
        <p className="text-xl font-bold text-c-primary-dark">{futurePerformance.gift}</p>
      </div>
    </div>
  );
}
