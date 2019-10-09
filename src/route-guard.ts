import { vuetyfireData, setFirestoreDocument } from 'vuetyfire';

export const routeGuard = (to: any, _: any, next: any) => {
  if (
    !to.matched.some((record: any) => !!record.meta && record.meta.requiresAuth)
  ) {
    next();
    return;
  }

  if (vuetyfireData.hasAuth) {
    vuetyfireData
      .firebase!.App.auth()
      .onAuthStateChanged((user: firebase.User | null) => {
        const goTo = (name: string) => {
          if (to.name !== name) {
            next({ name });
          } else {
            next();
          }
        };

        if (!user) {
          goTo('login');
          return;
        }

        const uid = user.uid;
        const email = user.email;
        const name = user.displayName;
        vuetyfireData
          .firebase!.firestore!.collection('users')
          .doc(uid)
          .get()
          .then(document => {
            const userData = document.data();

            const setNewUserData = () => {
              // Set user data
              const newUserData = {
                approved: false,
                configured: false,
                email,
                name,
                uid,
              };
              setFirestoreDocument({
                data: newUserData,
                path: `users/${uid}`,
                merge: true,
              })
                .then(() => {
                  goTo('approval');
                })
                .catch(err => {
                  throw new Error(err);
                });
            };

            if (!userData) {
              setNewUserData();
              return;
            }

            if (
              typeof userData.approved !== 'boolean' ||
              typeof userData.configured !== 'boolean'
            ) {
              setNewUserData();
              return;
            }

            if (!userData.approved) {
              goTo('approval');
              return;
            }

            if (!userData.configured) {
              goTo('welcome');
              return;
            }

            next();
          })
          .catch(err => {
            throw new Error(err);
          });
      });
  }
};
