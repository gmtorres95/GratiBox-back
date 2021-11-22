import fetchState from '../queries/fetchState.js';
import fetchCity from '../queries/fetchCity.js';
import insertDetails from '../queries/InsertDetails.js';
import insertSubscription from '../queries/insertSubscription.js';
import insertSubscribedItems from '../queries/insertSubscribedItems.js';

export default async function subscribe(req, res) {
  const userId = res.locals.user_id;
  const {
    city,
    state,
    dayId,
    items,
    name,
    address,
    zipcode,
  } = req.body;
  if (!city || !state || !dayId || !items || !name || !address || !zipcode) {
    return res.sendStatus(404);
  }

  try {
    const stateId = await fetchState(state);
    const cityId = await fetchCity(city, stateId);
    const deliveryId = await insertDetails(req.body, cityId);
    const subscriptionId = await insertSubscription(dayId, userId, deliveryId);
    items.map((item) => insertSubscribedItems(subscriptionId, item));

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
