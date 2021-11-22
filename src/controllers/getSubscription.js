import fetchDeliveryDetails from '../queries/fetchDeliveryDetails.js';
import fetchPlans from '../queries/fetchPlans.js';
import fetchSubscriptionItems from '../queries/fetchSubscriptionItems.js';
import fetchSubscriptions from '../queries/fetchSubscriptions.js';

export default async function getSubscription(req, res) {
  const userId = res.locals.user_id;

  try {
    const userSubscription = await fetchSubscriptions(userId);
    if (!userSubscription.length) return res.sendStatus(404);

    const deliveryDetails = await fetchDeliveryDetails(userSubscription[0].delivery_detail_id);
    const plan = await fetchPlans(userSubscription[0].delivery_day_id);
    if (!deliveryDetails.length || !plan.length) return res.sendStatus(404);

    const items = await fetchSubscriptionItems(userSubscription[0].id);

    delete userSubscription[0].delivery_day_id;
    delete userSubscription[0].delivery_detail_id;

    const result = {
      ...userSubscription[0],
      plan: { ...plan[0] },
      delivery: { ...deliveryDetails[0] },
      items: items.map((item) => item.item_name),
    };

    res.send(result);
  } catch (error) {
    res.sendStatus(500);
  }
}
